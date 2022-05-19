import { Module } from '@nestjs/common';
import { GradModule } from './grad/grad.module';
import { KomentarModule } from './komentar/komentar.module';
import { KorisnikModule } from './korisnik/korisnik.module';
import { ObjektModule } from './objekt/objekt.module';
import { RecenzijaModule } from './recenzija/recenzija.module';

// TODO: Ovdje "okupiti" sve module iz domene
@Module({
  imports: [
    KorisnikModule,
    ObjektModule,
    GradModule,
    RecenzijaModule,
    KomentarModule,
  ],
  exports: [
    KorisnikModule,
    ObjektModule,
    GradModule,
    RecenzijaModule,
    KomentarModule,
  ],
})
export class DomainModule {}
