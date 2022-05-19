import { Provider } from '@nestjs/common';
import { KomentarRepository } from './komentar.repository';

export const KomentarRepoProvider: Provider = {
  provide: 'KomentarRepo',
  useClass: KomentarRepository,
};
