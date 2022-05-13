import { GradModel } from './grad.model';

export interface IGradRepository {
  getAll(): Promise<GradModel[]>;
}
