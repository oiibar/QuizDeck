import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
