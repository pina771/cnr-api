import { Inject, Injectable } from '@nestjs/common';
import { RecenzijaModel } from './recenzija.model';
import { IRecenzijaRepository } from './repository.interface';

const RecenzijaRepo = () => Inject('RecenzijaRepo');
@Injectable()
export class RecenzijaService {
  constructor(
    @RecenzijaRepo() private readonly recenzijaRepository: IRecenzijaRepository,
  ) {}

  async getAll(): Promise<RecenzijaModel[]> {
    return await this.recenzijaRepository.getAll();
  }
}
