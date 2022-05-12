export class KorisnikModel {
  constructor(
    public id: number,
    public username: string,
    public pwd: string,
    public ime: string,
    public prezime: string,
    public email: string,
    public uloga: string,
  ) {}
}
