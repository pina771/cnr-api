import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Objekt } from 'src/entities/Objekt';
import { ObjektRepoProvider } from './objekt.repoProvider';

@Module({
  imports: [MikroOrmModule.forFeature([Objekt])],
  providers: [ObjektRepoProvider],
  exports: [ObjektRepoProvider],
})
export class ObjektRepoModule {}
