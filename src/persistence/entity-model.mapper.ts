import { Injectable } from '@nestjs/common';
import { FotografijaModel } from 'src/domain/fotografija/fotografija.model';
import { GradModel } from 'src/domain/grad/grad.model';
import { KorisnikModel } from 'src/domain/korisnik/korisnik.model';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { PogodnostModel } from 'src/domain/pogodnost/pogodnost.model';
import { RecenzijaModel } from 'src/domain/recenzija/recenzija.model';
import { Fotografija } from 'src/entities/Fotografija';
import { Objekt } from 'src/entities/Objekt';

@Injectable()
export class EntityModelMapper {
  /* TODO: Napraviti mapiranje na objektModel */
  objektE2M(objekt: Objekt): ObjektModel {
    const vlasnik = objekt.vlasnik.idKorisnik;
    const vlasnikModel = <KorisnikModel>vlasnik;

    const retval = new ObjektModel(
      objekt.id,
      objekt.naziv,
      objekt.adresa,
      objekt.kontaktBroj,
      vlasnikModel,
      objekt.grad.naziv,
      objekt.vrsta.kratica,
      objekt.radnoVrijeme,
      objekt.datumStvaranja,
      objekt.potvrden,
    );
    if (objekt.fotografije.isInitialized())
      retval.fotografije = objekt.fotografije.getItems().map((foto) => {
        return new FotografijaModel(foto.url);
      });

    if (objekt.pogodnosti.isInitialized())
      retval.pogodnosti = objekt.pogodnosti.getItems().map((pogodnost) => {
        return new PogodnostModel(pogodnost.naziv, pogodnost.opis);
      });

    /* TODO: Obaviti do kraja  */
    /*     if (objekt.recenzije.isInitialized())
      retval.recenzije = objekt.recenzije.getItems().map((recenzija) => {});
 */ return retval;
  }
}
