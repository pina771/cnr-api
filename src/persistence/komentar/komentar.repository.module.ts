import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Komentar } from 'src/entities/Komentar';
import { EntityModelMapper } from '../entity-model.mapper';
import { KomentarRepoProvider } from './komentar.repoProvider';

@Module({
  imports: [MikroOrmModule.forFeature([Komentar])],
  providers: [KomentarRepoProvider, EntityModelMapper],
  exports: [KomentarRepoProvider],
})
export class KomentarRepoModule {}
