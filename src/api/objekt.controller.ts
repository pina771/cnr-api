import {
  Body,
  Controller,
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
import { CreateObjectDTO } from './dtos/create-object.dto';
import { UpdateObjektDTO } from './dtos/update-object.dto';

/* TODO: Postaviti DTO za većinu ovih */
@Controller('objects')
export class ObjektController {
  constructor(
    private readonly objektService: ObjektService,
    private readonly gradService: GradService,
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
  /* WIP */
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

  /* Objavljivanje recenzije za objekt */
  @Post(':id')
  async postReview(): Promise<any> {}
}
