import { Selector } from '@ngxs/store';
import { BoatDto } from 'src/app/services/api.service';
import { BoatsState } from './boats.state';
import { BoatsStateModel } from './boats.state-model';

export class BoatsSelectors {
  @Selector([BoatsState])
  static boats(state: BoatsStateModel): BoatDto[] {
    return state.boats;
  }

  @Selector([BoatsState])
  static loading(state: BoatsStateModel): boolean {
    return state.loading;
  }
  @Selector([BoatsState])
  static error(state: BoatsStateModel): boolean {
    return state.error;
  }
}
