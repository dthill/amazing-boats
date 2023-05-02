import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { EMPTY, catchError, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import {
    EditBoatDetailsAction,
    LoadBoatDetailsAction,
} from './boat-details.actions';
import { BoatDetailsStateModel } from './boat-details.state-model';

const defaults: BoatDetailsStateModel = {
    boat: {},
    error: false,
    loading: false,
};

@State<BoatDetailsStateModel>({
    name: 'boatDetails',
    defaults,
})
@Injectable()
export class BoatDetailsState {
    constructor(private apiService: ApiService) {}

    @Action(LoadBoatDetailsAction)
    getDetails(
        ctx: StateContext<BoatDetailsStateModel>,
        { id }: LoadBoatDetailsAction
    ) {
        if (id) {
            return this.apiService.getBoatDetails(id).pipe(
                tap((response) => {
                    ctx.patchState({ boat: response, error: false });
                }),
                catchError((error) => {
                    console.error(error);
                    ctx.patchState({ error: true });
                    return EMPTY;
                })
            );
        }
        return EMPTY;
    }

    @Action(EditBoatDetailsAction)
    editDetails(
        ctx: StateContext<BoatDetailsStateModel>,
        { name, description, id }: EditBoatDetailsAction
    ) {
        ctx.patchState({ loading: true });
        return this.apiService.editBoat(id, name, description).pipe(
            tap((response) => {
                ctx.patchState({
                    error: false,
                    loading: false,
                    boat: response,
                });
            }),
            catchError((error) => {
                console.error(error);
                ctx.patchState({ error: true, loading: true });
                return EMPTY;
            })
        );
    }
}
