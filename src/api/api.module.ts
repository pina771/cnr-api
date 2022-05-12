import { Module } from '@nestjs/common';
import { KorisnikModule } from 'src/domain/korisnik/korisnik.module';
import { ObjektModule } from 'src/domain/objekt/objekt.module';
import { KorisnikController } from './korisnik.controller';
import { ObjektController } from './objekt.controller';

@Module({
  imports: [KorisnikModule, ObjektModule],
  controllers: [KorisnikController, ObjektController],
})
export class ApiModule {}
