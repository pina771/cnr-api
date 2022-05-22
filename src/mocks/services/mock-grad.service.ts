import { GradModel } from 'src/domain/grad/grad.model';
import { KorisnikModel } from 'src/domain/korisnik/korisnik.model';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { VrstaModel } from 'src/domain/vrsta/vrsta.model';

export class MockGradService {
  public gradovi = [
    new GradModel('Split', 21000),
    new GradModel('Zagreb', 10000),
  ];

  korisnik = new KorisnikModel(
    'korisnik-sid',
    'k-username',
    'k-ime',
    'k-prezime',
    'k-email',
    'ugostitelj',
  );
  vrsta = new VrstaModel(
    'Test vrsta',
    'Ovo je izmišljena vrsta stvorena za testiranej',
  );

  objektIzPrvogGrada = new ObjektModel(
    'o1-sid',
    'o1-Naziv',
    'o1-adresa',
    'o1-kontakt_broj',
    this.korisnik,
    this.gradovi[0],
    this.vrsta,
    '08:00-09:00',
    new Date(),
  );

  async getAll() {
    return this.gradovi;
  }

  async getAllObjektFromGrad(nazivGrada: string) {
    return [this.objektIzPrvogGrada];
  }
}
