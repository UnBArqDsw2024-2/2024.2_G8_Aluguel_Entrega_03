import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { TokenManager } from '../token.manager';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private tokenManager: TokenManager) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'asdsadkjnaskdjaskdnasdkjn123',
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, email: payload.email };
  }
}
