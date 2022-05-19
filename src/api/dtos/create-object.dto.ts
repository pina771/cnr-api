import { GradModel } from 'src/domain/grad/grad.model';
import { KorisnikModel } from 'src/domain/korisnik/korisnik.model';
import { VrstaModel } from 'src/domain/vrsta/vrsta.model';

export class CreateObjektDto {
  public naziv: string;
  public adresa: string;
  public kontaktBroj: string;
  public vlasnik: string;
  public grad: string;
  public vrsta: string;

  public pogodnosti?: string[];

  /* TODO: */
  public fotografije: string[];

  public radnoVrijeme?: string;
  public datumStvaranja?: Date;
  public potvrden?: boolean;
  public sid?: string;
}
