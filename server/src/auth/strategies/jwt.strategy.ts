import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      usernameField: 'username',
      secretOrKey: 'secretus',
    });
  }

  async validate(user: IUser) {
    return { id: user.id, username: user.username };
  }
}
