import { RegisterDTO } from 'src/api/dtos/register.dto';
import { KorisnikModel } from './korisnik.model';

export interface IKorisnikRepository {
  getAll(): Promise<KorisnikModel[]>;
  getSingle(id: number): Promise<KorisnikModel>;
  getByUsername(username: string): Promise<KorisnikModel | null>;
  newKorisnik(registerDto: RegisterDTO);
}
