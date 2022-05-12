import { Module } from '@nestjs/common';
import { ObjektRepoModule } from 'src/persistence/objekt/objekt.repository.module';
import { ObjektService } from './objekt.service';

@Module({
  imports: [ObjektRepoModule],
  providers: [ObjektService],
  exports: [ObjektService],
})
export class ObjektModule {}
