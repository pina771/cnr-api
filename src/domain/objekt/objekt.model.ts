import { Grad } from 'src/entities/Grad';
import { Ugostitelj } from 'src/entities/Ugostitelj';
import { Vrsta } from 'src/entities/Vrsta';
import { FotografijaModel } from '../fotografija/fotografija.model';
import { GradModel } from '../grad/grad.model';
import { KorisnikModel } from '../korisnik/korisnik.model';
import { PogodnostModel } from '../pogodnost/pogodnost.model';
import { RecenzijaModel } from '../recenzija/recenzija.model';
import { VrstaModel } from '../vrsta/vrsta.model';

/* TODO: Prominit Ugostitelj i Grad u domenske modele
a ne entitete */
export class ObjektModel {
  constructor(
    public id: number,
    public naziv: string,
    public adresa: string,
    public kontaktBroj: string,
    public vlasnik: KorisnikModel,
    public grad: GradModel | string,
    public vrsta: VrstaModel | string,

    public radnoVrijeme?: string,
    public datumStvaranja?: Date,
    public potvrden?: boolean,
    public recenzije?: RecenzijaModel[],
    public fotografije?: FotografijaModel[],
    public pogodnosti?: PogodnostModel[],
  ) {}
}
