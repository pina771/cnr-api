import { ObjektModel } from './objekt.model';

export interface IObjektRepository {
  getAll(): Promise<ObjektModel[]>;
  getSingle(idObjekt: number): Promise<ObjektModel>;
}
