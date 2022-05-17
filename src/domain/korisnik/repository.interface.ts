import { RegisterDTO } from 'src/api/dtos/register.dto';
import { KorisnikModel } from './korisnik.model';

export interface IKorisnikRepository {
  getAll(): Promise<KorisnikModel[]>;
  getSingle(username: string): Promise<KorisnikModel>;
  newKorisnik(korisnik: KorisnikModel);
}
