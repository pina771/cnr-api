import {
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
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

  @Get(':id')
  async getSingle(@Param('id') id: number): Promise<KorisnikModel> {
    return this.korisnikService.getSingle(id);
  }

  /*  */
  @Post()
  async newKorisnik(@Body() registerDto: RegisterDTO) {
    const result = await this.korisnikService.newKorisnik(registerDto);
    if (!result) {
      throw new ConflictException('Already exists.');
    } else return;
  }
}
