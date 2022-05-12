import { Provider } from '@nestjs/common';
import { ObjektRepository } from './objekt.repository';

export const ObjektRepoProvider: Provider = {
  provide: 'ObjektRepo',
  useClass: ObjektRepository,
};
