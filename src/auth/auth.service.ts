import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/api/dtos/login.dto';

import { KorisnikService } from 'src/domain/korisnik/korisnik.service';

@Injectable()
export class AuthService {
  constructor(
    private korisnikService: KorisnikService,
    private jwtService: JwtService,
  ) {}

  /* Koristi se tijekom prijave */
  async validateUser(loginDto: LoginDTO): Promise<any> {
    const korisnik = await this.korisnikService.getSingle(loginDto.username);
    if (korisnik && korisnik.pwd === loginDto.password) {
      const { pwd, ...result } = korisnik;
      return result; /* Uklonimo lozinku za svaki slučaj */
    }
    return null;
  }

  /* Nakon ispravno unesenih podataka i obavljenog validateUser-a, 
  Ova funkcija dodjeljuje JWT token, ali i vraća potpune informacije 
  o korisniku za frontend da se spremi u store */
  async login(korisnik: any) {
    const payload = {
      username: korisnik.username,
      sub: korisnik.id,
      uloga: korisnik.uloga,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: korisnik,
    };
  }
}
