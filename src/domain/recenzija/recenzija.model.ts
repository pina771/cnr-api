import { GeneralRecenzijaDTO } from 'src/api/dtos/recenzija/general-recenzija.dto';
import { Gost } from 'src/entities/Gost';
import { KorisnikModel } from '../korisnik/korisnik.model';
import { ObjektModel } from '../objekt/objekt.model';

export class RecenzijaModel {
  constructor(
    public gostUsername: string,

    public datumStvaranja: Date,
    public naslov: string,
    public tekst: string,
    public uređeno?: boolean,
    public objekt?: { naziv: string; sid: string },
  ) {}
}
