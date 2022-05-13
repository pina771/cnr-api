import { Controller, Get } from '@nestjs/common';
import { GradModel } from 'src/domain/grad/grad.model';
import { GradService } from 'src/domain/grad/grad.service';

@Controller('/cities')
export class GradController {
  constructor(private readonly gradService: GradService) {}

  @Get()
  async getAll(): Promise<GradModel[]> {
    return this.gradService.getAll();
  }
}
