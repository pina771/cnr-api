import { Provider } from '@nestjs/common';
import { GradRepository } from './grad.repository';

export const GradRepoProvider: Provider = {
  provide: 'GradRepo',
  useClass: GradRepository,
};
