import { Provider } from '@nestjs/common';
import { KorisnikRepository } from './korisnik.repository';

// NOTE: Ako zelimo mijenjati koju klasu želimo koristiti za repozitorij korisnika,
// samo promijenimo ovaj useClass
// Npr. za mock podataka ili tako nesto
// Ako pogledamo KorisnikService, tamo se vrši injekcija ovisnosti na temelju ovog Providera
export const KorisnikRepoProvider: Provider = {
  provide: 'KorisnikRepo',
  useClass: KorisnikRepository,
};
