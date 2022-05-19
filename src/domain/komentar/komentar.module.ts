import { Module } from '@nestjs/common';
import { KomentarRepoModule } from 'src/persistence/komentar/komentar.repository.module';
import { KomentarService } from './komentar.service';

@Module({
  imports: [KomentarRepoModule],
  providers: [KomentarService],
  exports: [KomentarService],
})
export class KomentarModule {}
