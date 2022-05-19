import { CreateRecenzijaDTO } from 'src/api/dtos/recenzija/create-recenzija.dto';
import { RecenzijaModel } from './recenzija.model';

export interface IRecenzijaRepository {
  getAll(): Promise<RecenzijaModel[]>;

  getSingle(objektSid: string, username: string): Promise<RecenzijaModel>;

  getAllFromObjekt(objektSid: string): Promise<RecenzijaModel[]>;

  newRecenzija(
    objektSid: string,
    recenzijaInfo: CreateRecenzijaDTO,
    username: string,
  ): Promise<any>;

  updateRecenzija(
    objektSid: string,
    recenzijaInfo: CreateRecenzijaDTO,
    username: string,
  ): Promise<any>;

  deleteRecenzija(objektSid: string, username: string): Promise<any>;
}
