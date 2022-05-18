import { ObjektModel } from 'src/domain/objekt/objekt.model';

export class GeneralObjektDTO {
  sid: string;
  naziv: string;
  adresa: string;
  kontaktBroj: string;

  grad: string;
  vrsta: string;
  radnoVrijeme: string;
  datumStvaranja: Date;
  potvrden?: boolean;

  constructor(objModel: ObjektModel) {
    this.sid = objModel.sid;
    this.naziv = objModel.naziv;
    this.adresa = objModel.adresa;
    this.kontaktBroj = objModel.kontaktBroj;
    this.grad = objModel.grad.naziv;
    this.vrsta = objModel.vrsta.kratica;
    this.radnoVrijeme = objModel.radnoVrijeme;
    this.datumStvaranja = objModel.datumStvaranja;
    this.potvrden = objModel.potvrden;
  }
}
