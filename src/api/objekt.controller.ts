import { Controller, Get, Param } from '@nestjs/common';
import { ObjektService } from 'src/domain/objekt/objekt.service';

@Controller('objects')
export class ObjektController {
  constructor(private readonly objektService: ObjektService) {}
  @Get()
  async getAll() {
    return this.objektService.getAll();
  }

  @Get(':grad')
  async getFromCity(@Param('grad') naziv: string) {}
}
