import { ObjektModel } from '../objekt/objekt.model';
import { RecenzijaModel } from '../recenzija/recenzija.model';

export class KorisnikModel {
  constructor(
    public sid: string,
    public username: string,

    public ime: string,
    public prezime: string,
    public email: string,
    public uloga: string,
    public pwd?: string, // Ne moramo lozinku prenositi u model

    // Ako je gost, onda ce imati recenzije
    // ako ugostitelj, onda ce imati objekte
    public recenzije?: RecenzijaModel[],
    public objekti?: ObjektModel[],
  ) {}
}
