import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { KorisnikModel } from 'src/domain/Korisnik/korisnik.model';
import { KorisnikService } from 'src/domain/korisnik/korisnik.service';
import { GeneralKorisnikDto } from './dtos/korisnik/general.dto';
import { GeneralObjektDTO } from './dtos/objekt/general-object.dto';
import { RegisterDTO } from './dtos/register.dto';

@Controller('users')
export class KorisnikController {
  constructor(private readonly korisnikService: KorisnikService) {}

  @Get()
  async getAll(): Promise<GeneralKorisnikDto[]> {
    return (await this.korisnikService.getAll()).map(
      (korisnik) => new GeneralKorisnikDto(korisnik),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/objects')
  async getAllObjektFromKorisnik(
    @Param('username') username: string,
    @Request() req,
  ) {
    if (req.user.username != username)
      throw new UnauthorizedException('Možete samo svoje podatke gledat.');

    return (await this.korisnikService.getAllObjektFromKorisnik(username)).map(
      (objModel) => new GeneralObjektDTO(objModel),
    );
  }

  /* TODO: Mapiranje na DTO? */
  @UseGuards(JwtAuthGuard)
  @Get(':username/reviews')
  async getAllRecenzijaFromKorisnik(
    @Param('username') username: string,
    @Request() req,
  ): Promise<any> {
    if (req.user.username != username)
      throw new UnauthorizedException('Možete samo gledati svoje podatke.');

    return await this.korisnikService.getAllRecenzijaFromKorisnik(username);
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
    if (await this.korisnikService.getSingle(registerDto.username))
      throw new ConflictException('Korisničko ime zauzeto.');
    return await this.korisnikService.newKorisnik(korisnik);
  }

  /* NOTE: OBSOLETE ?  */
  /* @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getSingle(
    @Param('username') username: string,
    @Request() req,
  ): Promise<KorisnikModel> {
    if (req.user.username != username)
      throw new UnauthorizedException(
        'Možete dohvatiti samo svoje informacije.',
      );
    return this.korisnikService.getSingle(username);
  } */
}
