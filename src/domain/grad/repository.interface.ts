import { ObjektModel } from '../objekt/objekt.model';
import { GradModel } from './grad.model';

export interface IGradRepository {
  getAll(): Promise<GradModel[]>;
  getAllObjektFromGrad(nazivGrada: string): Promise<ObjektModel[]>;
}
