import { CreateRecenzijaDTO } from 'src/api/dtos/recenzija/create-recenzija.dto';
import { KomentarModel } from '../komentar/komentar.model';
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

  /* KOMENTARI ************************** */

  /* Dohvat svih komentara za recenziju */
  getAllKomentarFromRecenzija(
    objektSid: string,
    username: string,
  ): Promise<KomentarModel[]>;

  /* Objavljivanje novog komentara na recenziju */
  newKomentarToRecenzija(
    recenzija: { objSid: string; username: string },
    komentar: { username: string; tekst: string },
  ): Promise<any>;

  /* TODO: Brisanje komentara */
}
