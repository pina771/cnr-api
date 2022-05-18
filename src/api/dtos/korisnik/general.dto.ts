import { KorisnikModel } from 'src/domain/korisnik/korisnik.model';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { RecenzijaModel } from 'src/domain/recenzija/recenzija.model';

export class GeneralKorisnikDto {
  public username: string;
  public uloga: string;

  public recenzije?: RecenzijaModel[];
  public objekti?: ObjektModel[];

  constructor(korisnikModel: KorisnikModel) {
    this.username = korisnikModel.username;
    this.uloga = korisnikModel.uloga;

    this.recenzije = korisnikModel.recenzije;
    this.objekti = korisnikModel.objekti;
  }
}
