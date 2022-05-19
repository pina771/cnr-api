import { Inject, Injectable } from '@nestjs/common';
import { CreateRecenzijaDTO } from 'src/api/dtos/recenzija/create-recenzija.dto';
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

  async getSingle(
    objektSid: string,
    username: string,
  ): Promise<RecenzijaModel> {
    return await this.recenzijaRepository.getSingle(objektSid, username);
  }

  async getAllFromObjekt(objektSid: string): Promise<RecenzijaModel[]> {
    return await this.recenzijaRepository.getAllFromObjekt(objektSid);
  }

  async newRecenzija(
    objektSid: string,
    recenzijaInfo: CreateRecenzijaDTO,
    username: string,
  ): Promise<any> {
    return await this.recenzijaRepository.newRecenzija(
      objektSid,
      recenzijaInfo,
      username,
    );
  }

  async updateRecenzija(
    objektSid: string,
    recenzijaInfo: CreateRecenzijaDTO,
    username: string,
  ): Promise<any> {
    return await this.recenzijaRepository.updateRecenzija(
      objektSid,
      recenzijaInfo,
      username,
    );
  }

  async deleteRecenzija(objektSid: string, username: string): Promise<any> {
    return await this.recenzijaRepository.deleteRecenzija(objektSid, username);
  }
}
