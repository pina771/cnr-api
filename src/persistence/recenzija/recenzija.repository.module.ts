import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Recenzija } from 'src/entities/Recenzija';
import { EntityModelMapper } from '../entity-model.mapper';
import { RecenzijaRepoProvider } from './recenzijaRepoProvider';

@Module({
  imports: [MikroOrmModule.forFeature([Recenzija])],
  providers: [RecenzijaRepoProvider, EntityModelMapper],
  exports: [RecenzijaRepoProvider],
})
export class RecenzijaRepoModule {}
