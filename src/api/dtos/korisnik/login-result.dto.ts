import { KorisnikModel } from 'src/domain/korisnik/korisnik.model';

export class LoginResultDto {
  public username: string;
  public sid: string;
  public ime: string;
  public prezime: string;
  public uloga: string;
  public email: string;

  constructor(korisnik: KorisnikModel) {
    this.sid = korisnik.sid;
    this.username = korisnik.username;
    this.ime = korisnik.ime;
    this.prezime = korisnik.prezime;
    this.uloga = korisnik.uloga;
    this.email = korisnik.email;
  }
}
