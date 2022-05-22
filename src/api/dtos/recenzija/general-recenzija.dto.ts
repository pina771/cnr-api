import { GeneralObjektDTO } from '../objekt/general-object.dto';

export class GeneralRecenzijaDTO {
  gostUsername: string;
  objekt: GeneralObjektDTO;
  datumStvaranja: Date;
  naslov: string;
  tekst: string;
  uredeno?: boolean;
}
