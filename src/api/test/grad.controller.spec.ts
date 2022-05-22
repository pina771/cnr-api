import { Test, TestingModule } from '@nestjs/testing';
import { GradModel } from 'src/domain/grad/grad.model';
import { GradService } from 'src/domain/grad/grad.service';
import { GradController } from '../grad.controller';

describe('GradController - UNIT', () => {
  let controller: GradController;

  const mockGradService = {
    getAll: jest.fn(() => {
      return [new GradModel('Zagreb', 100000), new GradModel('Split', 21000)];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradController],
      providers: [GradService],
    })
      .overrideProvider(GradService)
      .useValue(mockGradService)
      .compile();
    controller = module.get<GradController>(GradController);
  });

  it('Treba pozvati service i vratiti listu GradModel objekata', async () => {
    const retval = await controller.getAll();
    expect(mockGradService.getAll).toBeCalled();
    expect(retval).toBeInstanceOf(Array);
    retval.forEach((val) => expect(val).toBeInstanceOf(GradModel));
  });
});
