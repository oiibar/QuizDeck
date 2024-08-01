import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const passwordVerify = await argon2.verify(user.password, password);

    if (user && passwordVerify) {
      return user;
    }
    throw new BadRequestException('Username or password is incorrect');
  }

  async login(user: IUser) {
    const { id, username } = user;
    return {
      id,
      username,
      token: this.jwtService.sign({ id: user.id, username: user.username }),
    };
  }
}
