import { Module } from '@nestjs/common';
import { GradModule } from './grad/grad.module';
import { KorisnikModule } from './korisnik/korisnik.module';
import { ObjektModule } from './objekt/objekt.module';

// TODO: Ovdje "okupiti" sve module iz domene
@Module({
  imports: [KorisnikModule, ObjektModule, GradModule],
  exports: [KorisnikModule, ObjektModule, GradModule],
})
export class DomainModule {}
