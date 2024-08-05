import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { IUser } from 'src/types/types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(id: number, password: string): Promise<any> {
    const user = await this.userService.findOneById(id);

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new BadRequestException('Email or password is incorrect');
    }

    return user;
  }

  async signup(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOneByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.userService.create(createUserDto);

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    return { user, token };
  }

  async login(user: IUser) {
    const { id, email } = user;
    const token = this.jwtService.sign({ id, email });
    return { user, token };
  }
}
