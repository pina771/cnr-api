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

const mock_obj_dto: CreateObjektDto = {
  naziv: 'NoviObj',
  adresa: 'NovaAdr',
  kontaktBroj: 'novikbr',
  vlasnik: 'k-username',
  grad: 'noviGrad',
  vrsta: 'night club',
  fotografije: [],
};
const mock_objekti = [
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
export { mock_obj_dto, mock_objekti };
