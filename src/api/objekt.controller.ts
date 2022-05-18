import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GradService } from 'src/domain/grad/grad.service';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { ObjektService } from 'src/domain/objekt/objekt.service';
import { RecenzijaService } from 'src/domain/recenzija/recenzija.service';
import { CreateObjectDTO } from './dtos/create-object.dto';
import { CreateRecenzijaDTO } from './dtos/recenzija/create-recenzija.dto';
import { UpdateObjektDTO } from './dtos/update-object.dto';

/* TODO: Postaviti DTO za većinu ovih */
@Controller('objects')
export class ObjektController {
  constructor(
    private readonly objektService: ObjektService,
    private readonly gradService: GradService,
    private readonly recenzijaService: RecenzijaService,
  ) {}

  /* Dohvat svih objekata ili onih iz jednog grada */
  @Get()
  async getAll(@Query('city') nazivGrada: string): Promise<ObjektModel[]> {
    if (nazivGrada) {
      return this.gradService.getAllObjektFromGrad(nazivGrada);
    }
    return this.objektService.getAll();
  }

  /* Stvaranje novog objekta - može samo ugostitelj !*/
  @UseGuards(JwtAuthGuard)
  @Post()
  async newObjekt(@Request() req, @Body() body: CreateObjectDTO) {
    if (req.user.uloga != 'ugostitelj')
      throw new UnauthorizedException(
        'Samo ugostitelji mogu stvarati nove objekte!',
      );
    const objModel = new ObjektModel(
      randomUUID(),
      body.naziv,
      body.adresa,
      body.kontaktBroj,
      body.vlasnik,
      body.grad,
      body.vrsta,
    );
    return this.objektService.newObjekt(objModel);
  }

  /* Dohvat jednog objekta -- dohvaćaju se i recenzije, detalji itd. */
  @Get(':sid')
  async getSingle(@Param('sid') sidObjekt: string): Promise<ObjektModel> {
    return this.objektService.getSingle(sidObjekt);
  }

  /* Ažuriranje objekta */
  @UseGuards(JwtAuthGuard)
  @Put(':sid')
  async updateObjekt(
    @Request() req,
    @Param('sid') sidObjekt: string,
    @Body() noviObjekt: UpdateObjektDTO,
  ): Promise<any> {
    return this.objektService.updateObjekt(
      req.user.username,
      sidObjekt,
      noviObjekt,
    );
  }

  /* Objavljivanje/ažuriranje recenzije za objekt */
  @UseGuards(JwtAuthGuard)
  @Post(':sid/reviews')
  async postReview(
    @Param('sid') objSid: string,
    @Request() req,
    @Body() recenzijaInfo: CreateRecenzijaDTO,
  ): Promise<any> {
    if (req.user.uloga != 'gost')
      throw new UnauthorizedException('Samo gosti mogu objavljivati recenzije');

    if (await this.recenzijaService.getSingle(objSid, req.user.username))
      return await this.recenzijaService.updateRecenzija(
        objSid,
        recenzijaInfo,
        req.user.username,
      );
    return await this.recenzijaService.newRecenzija(
      objSid,
      recenzijaInfo,
      req.user.username,
    );
  }

  /* Brisanje recenzije za objekt */
  /* WIP */
  @UseGuards(JwtAuthGuard)
  @Delete(':sid/reviews')
  async deleteReview(
    @Param('sid') objSid: string,
    @Request() req,
  ): Promise<any> {
    if (req.user.uloga != 'gost')
      throw new UnauthorizedException(
        'Samo gosti mogu objavljivati recenzije!',
      );
    return await this.recenzijaService.deleteRecenzija(
      objSid,
      req.user.username,
    );
  }
}
