import { RegisterDTO } from 'src/api/dtos/register.dto';
import { ObjektModel } from '../objekt/objekt.model';
import { RecenzijaModel } from '../recenzija/recenzija.model';
import { KorisnikModel } from './korisnik.model';

export interface IKorisnikRepository {
  getAll(): Promise<KorisnikModel[]>;
  newKorisnik(korisnik: KorisnikModel);

  getAllObjektFromKorisnik(username: string): Promise<ObjektModel[]>;
  getAllRecenzijaFromKorisnik(username: string): Promise<RecenzijaModel[]>;

  getSingle(username: string): Promise<KorisnikModel>;
}
