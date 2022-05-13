import { Controller, Get, Param, Query } from '@nestjs/common';
import { GradService } from 'src/domain/grad/grad.service';
import { ObjektModel } from 'src/domain/objekt/objekt.model';
import { ObjektService } from 'src/domain/objekt/objekt.service';

@Controller('objects')
export class ObjektController {
  constructor(
    private readonly objektService: ObjektService,
    private readonly gradService: GradService,
  ) {}
  @Get()
  async getAll(@Query('city') nazivGrada: string): Promise<ObjektModel[]> {
    if (nazivGrada) {
      return this.gradService.getAllObjektFromGrad(nazivGrada);
    }
    return this.objektService.getAll();
  }
}
