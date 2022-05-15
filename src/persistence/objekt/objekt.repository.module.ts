import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Objekt } from 'src/entities/Objekt';
import { EntityModelMapper } from '../entity-model.mapper';
import { ObjektRepoProvider } from './objekt.repoProvider';

@Module({
  imports: [MikroOrmModule.forFeature([Objekt])],
  providers: [ObjektRepoProvider, EntityModelMapper],
  exports: [ObjektRepoProvider],
})
export class ObjektRepoModule {}
