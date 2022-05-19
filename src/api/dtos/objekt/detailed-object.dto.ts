import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { GeneralObjektDTO } from './general-object.dto';

export class DetailedObjektDTO extends GeneralObjektDTO {
  public pogodnosti: string[];
  public fotografije: string[];

  constructor(objModel: ObjektModel) {
    super(objModel);
    this.pogodnosti = objModel.pogodnosti.map((a) => a.naziv);
    this.fotografije = objModel.fotografije.map((f) => f.url);
  }
}
