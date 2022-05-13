import { Module } from '@nestjs/common';
import { GradRepoModule } from 'src/persistence/grad/grad.repository.module';
import { GradService } from './grad.service';

@Module({
  imports: [GradRepoModule],
  providers: [GradService],
  exports: [GradService],
})
export class GradModule {}
