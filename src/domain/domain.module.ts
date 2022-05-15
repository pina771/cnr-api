import { Module } from '@nestjs/common';
import { GradModule } from './grad/grad.module';
import { KorisnikModule } from './korisnik/korisnik.module';
import { ObjektModule } from './objekt/objekt.module';
import { RecenzijaModule } from './recenzija/recenzija.module';

// TODO: Ovdje "okupiti" sve module iz domene
@Module({
  imports: [KorisnikModule, ObjektModule, GradModule, RecenzijaModule],
  exports: [KorisnikModule, ObjektModule, GradModule, RecenzijaModule],
})
export class DomainModule {}
