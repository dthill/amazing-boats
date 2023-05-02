import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { EMPTY, catchError, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import {
    AddBoatAction,
    DeleteBoatAction,
    LoadBoatsAction,
    ResetBoatErrorAction,
} from './boats.actions';
import { BoatsStateModel } from './boats.state-model';

const defaults: BoatsStateModel = {
    loading: false,
    error: false,
    boats: [],
};

@State<BoatsStateModel>({
    name: 'boats',
    defaults,
})
@Injectable()
export class BoatsState {
    constructor(private apiService: ApiService) {}

    @Action(LoadBoatsAction)
    loadAll(ctx: StateContext<BoatsStateModel>) {
        ctx.patchState({ loading: true });
        return this.apiService.getBoats().pipe(
            tap((response) => {
                ctx.patchState({ loading: false, boats: response });
            }),
            catchError((error) => {
                console.error(error);
                ctx.patchState({ loading: false });
                return EMPTY;
            })
        );
    }

    @Action(AddBoatAction)
    addBoat(
        ctx: StateContext<BoatsStateModel>,
        { name, description }: AddBoatAction
    ) {
        ctx.patchState({ loading: true, error: false });
        return this.apiService.addBoat(name, description).pipe(
            tap((response) => {
                ctx.patchState({
                    error: false,
                    loading: false,
                    boats: [...ctx.getState().boats, response],
                });
            }),
            catchError((error) => {
                console.error(error);
                ctx.patchState({ error: true, loading: false });
                return EMPTY;
            })
        );
    }

    @Action(DeleteBoatAction)
    deleteBoat(ctx: StateContext<BoatsStateModel>, { id }: DeleteBoatAction) {
        ctx.patchState({ loading: true, error: false });
        return this.apiService.deleteBoat(id).pipe(
            tap(() => {
                ctx.patchState({
                    error: false,
                    loading: false,
                    boats: [
                        ...ctx
                            .getState()
                            .boats.filter((boat) => boat.id !== id),
                    ],
                });
            }),
            catchError((error) => {
                console.error(error);
                ctx.patchState({ error: true, loading: false });
                return EMPTY;
            })
        );
    }

    @Action(ResetBoatErrorAction)
    resetError(ctx: StateContext<BoatsStateModel>) {
        ctx.patchState({ loading: false, error: false });
    }
}
