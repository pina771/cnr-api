import { Gost } from 'src/entities/Gost';
import { KorisnikModel } from '../korisnik/korisnik.model';
import { ObjektModel } from '../objekt/objekt.model';

/* TODO: Trenutno radi sa GostEntitet */
export class RecenzijaModel {
  constructor(
    public gost: KorisnikModel, // Ovo ce biti vjv Korisnik/Gost

    public datumStvaranja: Date,
    public naslov: string,
    public tekst: string,
    public uređeno?: boolean,
    public objekt?: ObjektModel,
  ) {}
}
