import { GeneralKorisnikDto } from '../korisnik/general.dto';
import { GeneralObjektDTO } from '../objekt/general-object.dto';

export class GeneralRecenzijaDTO {
  gost: GeneralKorisnikDto;
  objekt: GeneralObjektDTO;
  datumStvaranja: Date;
  naslov: string;
  tekst: string;
  uredeno?: boolean;
}
