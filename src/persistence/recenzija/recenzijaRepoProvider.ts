import { Provider } from '@nestjs/common';
import { RecenzijaRepository } from './recenzija.repository';

export const RecenzijaRepoProvider: Provider = {
  provide: 'RecenzijaRepo',
  useClass: RecenzijaRepository,
};
