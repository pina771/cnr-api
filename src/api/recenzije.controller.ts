import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { KomentarModel } from 'src/domain/komentar/komentar.model';
import { RecenzijaModel } from 'src/domain/recenzija/recenzija.model';
import { RecenzijaService } from 'src/domain/recenzija/recenzija.service';

@Controller('reviews')
export class RecenzijaController {
  constructor(private readonly recenzijaService: RecenzijaService) {}

  @Get()
  async getAll(): Promise<RecenzijaModel[]> {
    return this.recenzijaService.getAll();
  }

  /* Dohvat komentara za recenziju */
  @Get(':sid/:username')
  async getAllKomentarFromRecenzija(
    @Param('sid') objektSid: string,
    @Param('username') recUsername: string,
  ): Promise<KomentarModel[]> {
    return this.recenzijaService.getAllKomentarFromRecenzija(
      objektSid,
      recUsername,
    );
  }

  /* Objava komentara na recenziju */
  @UseGuards(JwtAuthGuard)
  @Post(':sid/:username')
  async newKomentarToRecenzija(
    @Param('sid') objektSid: string,
    @Param('username') username: string,
    @Request() req,
    @Body('tekst') tekst: string,
  ) {
    const recenzija = { objSid: objektSid, username: username };
    const komentar = { username: req.user.username, tekst: tekst };
    return this.recenzijaService.newKomentarToRecenzija(recenzija, komentar);
  }
}
