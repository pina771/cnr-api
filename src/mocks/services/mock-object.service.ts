import { randomUUID } from 'crypto';
import { CreateObjektDto } from 'src/api/dtos/create-object.dto';
import { GradModel } from 'src/domain/grad/grad.model';
import { KorisnikModel } from 'src/domain/korisnik/korisnik.model';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { PogodnostModel } from 'src/domain/pogodnost/pogodnost.model';
import { VrstaModel } from 'src/domain/vrsta/vrsta.model';

const korisnik = new KorisnikModel(
  'korisnik-sid',
  'k-username',
  'k-ime',
  'k-prezime',
  'k-email',
  'ugostitelj',
);
const grad = new GradModel('Zagreb', 100000);
const grad2 = new GradModel('Split', 21000);
const vrsta = new VrstaModel(
  'Test vrsta',
  'Ovo je izmišljena vrsta stvorena za testiranej',
);
const pogodnosti = [
  new PogodnostModel('Test pogodnost1', 'Ovo je prva testna pogodnost'),
  new PogodnostModel('Test pogodnost2', 'Ovo je druga testna pogodnost'),
];
/* Lažna implementacija ObjektServiceRazreda */
export class MockObjektService {
  public objekti: ObjektModel[] = [
    new ObjektModel(
      'o1-sid',
      'o1-Naziv',
      'o1-adresa',
      'o1-kontakt_broj',
      korisnik,
      grad,
      vrsta,
      '08:00-09:00',
      new Date(),
      true,
      undefined,
      [], // nemamo fotografije
      pogodnosti,
    ),
    new ObjektModel(
      'o2-sid',
      'o2-Naziv',
      'o2-adresa',
      'o2-kontakt_broj',
      korisnik,
      grad2,
      vrsta,
      '08:00-09:00',
      new Date(),
    ),
  ];

  getAll() {
    return this.objekti;
  }
  getSingle(sidObjekt: string) {
    const filtered = this.objekti.filter(function (obj) {
      return obj.naziv.indexOf(sidObjekt) === -1;
    });
    return filtered[0];
  }
  newObjekt(body: CreateObjektDto) {
    const val = new ObjektModel(
      randomUUID(),
      body.naziv,
      body.adresa,
      body.kontaktBroj,
      korisnik,
      grad,
      vrsta,
      body.radnoVrijeme,
      new Date(),
      false,
      [],
      [],
      pogodnosti,
    );
    this.objekti.push(val);
    return val;
  }
  async deleteObjekt(username: string, sidObjekt: string) {
    return true;
  }
}
