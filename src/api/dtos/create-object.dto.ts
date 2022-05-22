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

  public radnoVrijeme?: string; // moze se poslati, ali ne treba (ako ne zeli)
  public datumStvaranja?: Date; // Ne treba slat, automatski se postavi
  public potvrden?: boolean; // Ne treba slat, automatski se postavi na false
  public sid?: string; // Ne treba slat, stvori se sam
}
