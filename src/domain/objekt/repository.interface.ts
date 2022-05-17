import { ObjektModel } from './objekt.model';

export interface IObjektRepository {
  getAll(): Promise<ObjektModel[]>;
  getSingle(sidObjekt: string): Promise<ObjektModel>;
  newObjekt(objekt: ObjektModel): Promise<any>;
}
