import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'reflections-of-a-floating-world',
    });
  }

  /* Validate uzrokuje da se u Request objektu pojavi ono šta je return dolje, AKO smo postavili da se  */
  /* koristi ova strategija (JwtStrategy) */
  async validate(payload: any) {
    /* Ovdje, možemo raditi business logiku ako želimo, primjerice dohvatit ga iz baze da imamo sve informacije */
    /* NOTE: Ako radimo Vue store / Vuex / Pinia, vjv neće trebati slati sve nanovo  */
    return {
      id: payload.sub,
      username: payload.username,
      uloga: payload.uloga,
    };
  }
}
