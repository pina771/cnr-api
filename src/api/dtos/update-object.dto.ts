import { GradModel } from 'src/domain/grad/grad.model';
import { KorisnikModel } from 'src/domain/korisnik/korisnik.model';
import { VrstaModel } from 'src/domain/vrsta/vrsta.model';

export class UpdateObjektDTO {
  public naziv?: string;
  public adresa?: string;
  public kontaktBroj?: string;
  public grad?: GradModel;
  public vrsta?: VrstaModel;

  public radnoVrijeme?: string;
  public pogodnosti?: string[];
}
