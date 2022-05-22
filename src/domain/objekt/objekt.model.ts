import { FotografijaModel } from '../fotografija/fotografija.model';
import { GradModel } from '../grad/grad.model';
import { KorisnikModel } from '../korisnik/korisnik.model';
import { PogodnostModel } from '../pogodnost/pogodnost.model';
import { RecenzijaModel } from '../recenzija/recenzija.model';
import { VrstaModel } from '../vrsta/vrsta.model';

export class ObjektModel {
  constructor(
    public sid: string,
    public naziv: string,
    public adresa: string,
    public kontaktBroj: string,
    public vlasnik: KorisnikModel,
    public grad: GradModel,
    public vrsta: VrstaModel,

    public radnoVrijeme?: string,
    public datumStvaranja?: Date,
    public potvrden?: boolean,
    public recenzije?: RecenzijaModel[],
    public fotografije?: FotografijaModel[],
    public pogodnosti?: PogodnostModel[],
  ) {}
}
