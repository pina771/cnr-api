import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { GradController } from './grad.controller';
import { KorisnikController } from './korisnik.controller';
import { ObjektController } from './objekt.controller';
import { RecenzijaController } from './recenzije.controller';

@Module({
  imports: [DomainModule],
  controllers: [
    RecenzijaController,
    KorisnikController,
    ObjektController,
    GradController,
  ],
})
export class ApiModule {}
