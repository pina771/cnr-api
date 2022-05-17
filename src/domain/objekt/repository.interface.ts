import { UpdateObjektDTO } from 'src/api/dtos/update-object.dto';
import { ObjektModel } from './objekt.model';

export interface IObjektRepository {
  getAll(): Promise<ObjektModel[]>;
  getSingle(sidObjekt: string): Promise<ObjektModel>;
  newObjekt(objekt: ObjektModel): Promise<any>;
  updateObjekt(postojeciObjekt: ObjektModel, noviObjekt: UpdateObjektDTO);
}
