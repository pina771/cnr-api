import { RecenzijaModel } from '../recenzija/recenzija.model';

export class KorisnikModel {
  constructor(
    public id: number,
    public username: string,

    public ime: string,
    public prezime: string,
    public email: string,
    public uloga: string,
    public pwd?: string, // Ne moramo lozinku prenositi u model

    // Ako je gost, onda ce imati recenzije
    public recenzije?: RecenzijaModel[],
  ) {}
}
