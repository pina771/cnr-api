import { Injectable } from '@nestjs/common';
import { FotografijaModel } from 'src/domain/fotografija/fotografija.model';
import { GradModel } from 'src/domain/grad/grad.model';
import { KorisnikModel } from 'src/domain/korisnik/korisnik.model';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { PogodnostModel } from 'src/domain/pogodnost/pogodnost.model';
import { RecenzijaModel } from 'src/domain/recenzija/recenzija.model';
import { Fotografija } from 'src/entities/Fotografija';
import { Gost } from 'src/entities/Gost';
import { Grad } from 'src/entities/Grad';
import { Korisnik } from 'src/entities/Korisnik';
import { Objekt } from 'src/entities/Objekt';
import { Recenzija } from 'src/entities/Recenzija';
import { Ugostitelj } from 'src/entities/Ugostitelj';

@Injectable()
export class EntityModelMapper {
  /* Ako je od ugostitelja, treba postaviti vlasnika na NULL
   * zato što ne želimo cirkularan JSON */
  objektE2M(objekt: Objekt, fromUgostitelj = false): ObjektModel {
    const vlasnikModel = fromUgostitelj
      ? null
      : this.korisnikE2M(objekt.vlasnik.idKorisnik);

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

    if (objekt.recenzije.isInitialized())
      retval.recenzije = objekt.recenzije
        .getItems()
        .map((recEntity) => this.recenzijaE2M(recEntity));
    return retval;
  }

  /* NOTE: ???? How to !? */
  /* TODO : TESTIRATI OVO OBAVEZNO */
  gradE2M(grad: Grad): GradModel {
    return new GradModel(grad.naziv, grad.postanskiBroj);
  }

  /* Dvije su situacije ovdje koje želimo rješiti:
   * 1. Ako instanciramo recenzije za neki objekt, onda moramo učitat gosta
     iz Recenzija, a Objekt vec imamo
   * 2. Ako instanciramo sve recenzije za gosta, onda se on prenosi kao argument 
     i ne treba ga postavljati u modelu*/
  recenzijaE2M(recenzija: Recenzija, gost?: KorisnikModel): RecenzijaModel {
    let recModel: RecenzijaModel;
    if (gost) {
      recModel = new RecenzijaModel(
        null,
        recenzija.datumStvaranja,
        recenzija.naslov,
        recenzija.tekst,
        recenzija.uređeno,
      );
      recModel.objekt = this.objektE2M(recenzija.idObjekt);
    } else {
      recModel = new RecenzijaModel(
        this.korisnikE2M(recenzija.idKorisnik.idKorisnik),
        recenzija.datumStvaranja,
        recenzija.naslov,
        recenzija.tekst,
        recenzija.uređeno,
      );
    }
    return recModel;
  }

  korisnikE2M(korisnik: Korisnik): KorisnikModel {
    return new KorisnikModel(
      korisnik.id,
      korisnik.username,
      korisnik.ime,
      korisnik.prezime,
      korisnik.email,
      korisnik.uloga,
    );
  }

  gostE2M(gost: Gost): KorisnikModel {
    const korisnik = this.korisnikE2M(gost.idKorisnik);
    if (gost.recenzije.isInitialized())
      korisnik.recenzije = gost.recenzije
        .getItems()
        .map((recenzijaEntity) => this.recenzijaE2M(recenzijaEntity, korisnik));
    return korisnik;
  }

  ugostiteljE2M(ugostitelj: Ugostitelj): KorisnikModel {
    const korisnik = this.korisnikE2M(ugostitelj.idKorisnik);
    if (ugostitelj.objekti.isInitialized()) {
      korisnik.objekti = ugostitelj.objekti.getItems().map((objektEntity) => {
        return this.objektE2M(objektEntity, true);
      });
    }
    return korisnik;
  }
}
