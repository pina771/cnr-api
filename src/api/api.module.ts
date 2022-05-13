import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { GradController } from './grad.controller';
import { KorisnikController } from './korisnik.controller';
import { ObjektController } from './objekt.controller';

@Module({
  imports: [DomainModule],
  controllers: [KorisnikController, ObjektController, GradController],
})
export class ApiModule {}
