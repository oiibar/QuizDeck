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

  async validateUser(
    id: number,
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this.userService.findOneById(id);

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new BadRequestException('Username or password is incorrect');
    }

    return user;
  }

  async login(user: IUser) {
    const { id, username } = user;
    const token = this.jwtService.sign({ id, username });
    return { user, token };
  }

  async signup(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOneByUsername(
      createUserDto.username,
    );

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const user = await this.userService.create(createUserDto);

    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });

    return {
      id: user.id,
      username: user.username,
      token,
      createdAt: user.createdAt,
    };
  }
}
