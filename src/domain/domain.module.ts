import { Module } from '@nestjs/common';
import { KorisnikModule } from './korisnik/korisnik.module';
import { ObjektModule } from './objekt/objekt.module';

// TODO: Ovdje "okupiti" sve module iz domene
@Module({
  imports: [KorisnikModule, ObjektModule],
  exports: [KorisnikModule, ObjektModule],
})
export class DomainModule {}
