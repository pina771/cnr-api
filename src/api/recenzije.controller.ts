import { Controller, Get } from '@nestjs/common';
import { RecenzijaModel } from 'src/domain/recenzija/recenzija.model';
import { RecenzijaService } from 'src/domain/recenzija/recenzija.service';

@Controller('reviews')
export class RecenzijaController {
  constructor(private readonly recenzijaService: RecenzijaService) {}

  @Get()
  async getAll(): Promise<RecenzijaModel[]> {
    return this.recenzijaService.getAll();
  }

  /* TODO: Provjeriti da li treba uopće ovo raditi */
  @Get()
  async getFromSingle(): Promise<RecenzijaModel[]> {
    return null;
  }
}
