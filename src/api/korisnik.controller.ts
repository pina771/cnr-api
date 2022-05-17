import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { KorisnikModel } from 'src/domain/Korisnik/korisnik.model';
import { KorisnikService } from 'src/domain/korisnik/korisnik.service';
import { RegisterDTO } from './dtos/register.dto';

@Controller('users')
export class KorisnikController {
  constructor(private readonly korisnikService: KorisnikService) {}
  @Get()
  async getAll(): Promise<KorisnikModel[]> {
    return this.korisnikService.getAll();
  }

  @Get(':username')
  async getSingle(@Param('username') username: string): Promise<KorisnikModel> {
    return this.korisnikService.getSingle(username);
  }

  /* NOTE: Zasad gleda samo postoji li korisničko ime  */
  @Post()
  @HttpCode(201)
  async newKorisnik(@Body() registerDto: RegisterDTO) {
    const korisnik = new KorisnikModel(
      randomUUID(),
      registerDto.username,
      registerDto.ime,
      registerDto.prezime,
      registerDto.email,
      registerDto.uloga,
      registerDto.pwd,
    );
    return await this.korisnikService.newKorisnik(korisnik);
  }
}
