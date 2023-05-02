import { Selector } from '@ngxs/store';
import { BoatDto } from 'src/app/services/api.service';
import { BoatDetailsState } from './boat-details.state';
import { BoatDetailsStateModel } from './boat-details.state-model';

export class BoatDetailsSelectors {
    @Selector([BoatDetailsState])
    static boatDetails(
        state: BoatDetailsStateModel
    ): BoatDto | Record<string, never> {
        return state.boat;
    }

    @Selector([BoatDetailsState])
    static loading(state: BoatDetailsStateModel): boolean {
        return state.loading;
    }

    @Selector([BoatDetailsState])
    static error(state: BoatDetailsStateModel): boolean {
        return state.error;
    }
}
