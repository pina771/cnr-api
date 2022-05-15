import { RecenzijaModel } from './recenzija.model';

export interface IRecenzijaRepository {
  getAll(): Promise<RecenzijaModel[]>;
}
