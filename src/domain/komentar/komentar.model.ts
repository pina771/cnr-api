export class KomentarModel {
  constructor(
    public username: string,
    public uloga: string,
    public tekst: string,
    public datumStvaranja: string,

    public recenzijaUsername: string,
    public objektSid: string,

    public uređeno?: boolean,
    public id?: number,
  ) {}
}
