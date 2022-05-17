export class CreateObjectDTO {
  public naziv: string;
  public adresa: string;
  public kontaktBroj: string;
  public vlasnik: string;
  public grad: string;
  public vrsta: string;

  public radnoVrijeme?: string;
  public datumStvaranja?: Date;
  public potvrden?: boolean;
}
