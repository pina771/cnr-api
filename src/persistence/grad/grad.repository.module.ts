import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Grad } from 'src/entities/Grad';
import { GradRepoProvider } from './grad.repoProvider';

@Module({
  imports: [MikroOrmModule.forFeature([Grad])],
  providers: [GradRepoProvider],
  exports: [GradRepoProvider],
})
export class GradRepoModule {}
