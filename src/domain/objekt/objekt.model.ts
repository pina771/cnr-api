import { Grad } from 'src/entities/Grad';
import { Ugostitelj } from 'src/entities/Ugostitelj';
import { Vrsta } from 'src/entities/Vrsta';

/* TODO: Prominit Ugostitelj i Grad u domenske modele
a ne entitete */
export class ObjektModel {
  constructor(
    public id: number,
    public naziv: string,
    public adresa: string,
    public kontaktBroj: string,
    public vlasnik: Ugostitelj,
    public grad: Grad,
    public vrsta: Vrsta,
    public radnoVrijeme?: string,
    public datumStvaranja?: Date,
    public potvrden?: boolean,
  ) {}
}
