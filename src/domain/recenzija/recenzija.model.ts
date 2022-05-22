export class RecenzijaModel {
  constructor(
    public gostUsername: string,

    public datumStvaranja: Date,
    public naslov: string,
    public tekst: string,
    public uređeno?: boolean,
    public objekt?: { naziv: string; sid: string },
  ) {}
}
