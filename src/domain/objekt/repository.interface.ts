import { CreateObjektDto } from 'src/api/dtos/create-object.dto';
import { UpdateObjektDTO } from 'src/api/dtos/update-object.dto';
import { ObjektModel } from './objekt.model';

export interface IObjektRepository {
  getAll(): Promise<ObjektModel[]>;
  getSingle(sidObjekt: string): Promise<ObjektModel>;
  newObjekt(createDTO: CreateObjektDto): Promise<any>;
  updateObjekt(postojeciObjekt: ObjektModel, noviObjekt: UpdateObjektDTO);
  deleteObjekt(sidObjekt: string): Promise<any>;
}
