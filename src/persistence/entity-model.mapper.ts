import { Injectable } from '@nestjs/common';
import { FotografijaModel } from 'src/domain/fotografija/fotografija.model';
import { GradModel } from 'src/domain/grad/grad.model';
import { KomentarModel } from 'src/domain/komentar/komentar.model';
import { KorisnikModel } from 'src/domain/korisnik/korisnik.model';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { PogodnostModel } from 'src/domain/pogodnost/pogodnost.model';
import { RecenzijaModel } from 'src/domain/recenzija/recenzija.model';
import { Gost } from 'src/entities/Gost';
import { Grad } from 'src/entities/Grad';
import { Komentar } from 'src/entities/Komentar';
import { Korisnik } from 'src/entities/Korisnik';
import { Objekt } from 'src/entities/Objekt';
import { Recenzija } from 'src/entities/Recenzija';
import { Ugostitelj } from 'src/entities/Ugostitelj';

@Injectable()
export class EntityModelMapper {
  korisnikE2M(korisnik: Korisnik): KorisnikModel {
    return new KorisnikModel(
      korisnik.sid,
      korisnik.username,
      korisnik.ime,
      korisnik.prezime,
      korisnik.email,
      korisnik.uloga,
      korisnik.pwd,
    );
  }

  gostE2M(gost: Gost): KorisnikModel {
    const korisnik = this.korisnikE2M(gost.idKorisnik);
    korisnik.recenzije = gost.recenzije
      .getItems()
      .map((recEntity) => this.recenzijaE2M(recEntity, gost));
    return korisnik;
  }

  recenzijaE2M(recenzija: Recenzija, gost?: Gost): RecenzijaModel {
    const objInfo = {
      naziv: recenzija.idObjekt.naziv,
      sid: recenzija.idObjekt.sid,
    };
    let gostUsername: string;
    if (gost) gostUsername = gost.idKorisnik.username;
    else gostUsername = recenzija.idKorisnik.idKorisnik.username;

    return new RecenzijaModel(
      gostUsername,
      recenzija.datumStvaranja,
      recenzija.naslov,
      recenzija.tekst,
      recenzija.uređeno,
      objInfo,
    );
  }

  objektE2M(objekt: Objekt): ObjektModel {
    const vlasnikAsKorisnik = this.korisnikE2M(objekt.vlasnik.idKorisnik);

    const retval = new ObjektModel(
      objekt.sid,
      objekt.naziv,
      objekt.adresa,
      objekt.kontaktBroj,
      vlasnikAsKorisnik,
      objekt.grad,
      objekt.vrsta,
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

  ugostiteljE2M(ugostitelj: Ugostitelj): KorisnikModel {
    const korisnik = this.korisnikE2M(ugostitelj.idKorisnik);
    if (ugostitelj.objekti.isInitialized()) {
      korisnik.objekti = ugostitelj.objekti.getItems().map((objektEntity) => {
        return this.objektE2M(objektEntity);
      });
    }
    return korisnik;
  }

  komentarE2M(komentar: Komentar, recenzija: Recenzija): KomentarModel {
    return new KomentarModel(
      komentar.idKorisnik.username,
      komentar.idKorisnik.uloga,
      komentar.tekst,
      komentar.datumStvaranja,
      recenzija.idKorisnik.idKorisnik.username,
      recenzija.idObjekt.sid,
      komentar.uređeno,
      komentar.idKomentar,
    );
  }
}
