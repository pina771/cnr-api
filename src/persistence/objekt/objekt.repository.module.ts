import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Grad } from 'src/entities/Grad';
import { Objekt } from 'src/entities/Objekt';
import { Vrsta } from 'src/entities/Vrsta';
import { EntityModelMapper } from '../entity-model.mapper';
import { ObjektRepoProvider } from './objekt.repoProvider';

@Module({
  imports: [MikroOrmModule.forFeature([Objekt, Grad, Vrsta])],
  providers: [ObjektRepoProvider, EntityModelMapper],
  exports: [ObjektRepoProvider],
})
export class ObjektRepoModule {}
