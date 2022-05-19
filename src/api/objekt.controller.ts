import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { CreateObjektDto } from './dtos/create-object.dto';
import { DetailedObjektDTO } from './dtos/objekt/detailed-object.dto';
import { GeneralObjektDTO } from './dtos/objekt/general-object.dto';
import { CreateRecenzijaDTO } from './dtos/recenzija/create-recenzija.dto';
import { GeneralRecenzijaDTO } from './dtos/recenzija/general-recenzija.dto';
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
  async getAll(@Query('city') nazivGrada: string): Promise<GeneralObjektDTO[]> {
    if (nazivGrada) {
      return (await this.gradService.getAllObjektFromGrad(nazivGrada)).map(
        (objModel) => new GeneralObjektDTO(objModel),
      );
    }
    return (await this.objektService.getAll()).map(
      (objModel) => new GeneralObjektDTO(objModel),
    );
  }

  @Get(':sid')
  async getSingle(@Param('sid') sidObjekt: string): Promise<DetailedObjektDTO> {
    const obj = await this.objektService.getSingle(sidObjekt);
    if (obj == null) throw new NotFoundException();
    return new DetailedObjektDTO(obj);
  }

  @Get(':sid/reviews')
  async getAllRecenzijaForObjekt(
    @Param('sid') sidObjekt: string,
  ): Promise<any[]> {
    return await this.recenzijaService.getAllFromObjekt(sidObjekt);
  }

  /* Stvaranje novog objekta - može samo ugostitelj !*/
  @UseGuards(JwtAuthGuard)
  @Post()
  async newObjekt(@Request() req, @Body() body: CreateObjektDto) {
    if (req.user.uloga != 'ugostitelj')
      throw new UnauthorizedException(
        'Samo ugostitelji mogu stvarati nove objekte!',
      );
    return this.objektService.newObjekt(body);
  }

  /* Ažuriranje objekta */
  @UseGuards(JwtAuthGuard)
  @Put(':sid')
  async updateObjekt(
    @Request() req,
    @Param('sid') sidObjekt: string,
    @Body() noviObjekt: UpdateObjektDTO,
  ): Promise<any> {
    return new DetailedObjektDTO(
      await this.objektService.updateObjekt(
        req.user.username,
        sidObjekt,
        noviObjekt,
      ),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':sid')
  async deleteObjekt(
    @Request() req,
    @Param('sid') sidObjekt: string,
  ): Promise<any> {
    if (req.user.uloga != 'ugostitelj')
      throw new UnauthorizedException('Niste ugostitelj.');
    return await this.objektService.deleteObjekt(req.user.username, sidObjekt);
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
