import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { EMPTY, catchError, of, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoginAction, LogoutAction, RegisterAction } from './user.actions';
import { UserStateModel } from './user.state-model';

const defaults: UserStateModel = {
    token: null,
    loading: false,
    error: false,
};

@State<UserStateModel>({
    name: 'user',
    defaults,
})
@Injectable()
export class UserState {
    constructor(private apiService: ApiService) {}

    @Action(LoginAction)
    login(ctx: StateContext<UserStateModel>, { email, password }: LoginAction) {
        ctx.patchState({
            loading: true,
            error: false,
            token: btoa(`${email}:${password}`),
        });
        return this.apiService.login(email, password).pipe(
            tap((response) => {
                if (response === null) {
                    ctx.setState({ loading: false, error: true, token: null });
                } else {
                    ctx.patchState({ loading: false, error: false });
                }
            }),
            catchError((error) => {
                console.error(error);
                ctx.setState({ error: true, loading: false, token: null });
                return of(null);
            })
        );
    }

    @Action(LogoutAction)
    logout(ctx: StateContext<UserStateModel>) {
        ctx.setState(defaults);
        return this.apiService.logout().pipe(
            catchError((error) => {
                console.error(error);
                return EMPTY;
            })
        );
    }

    @Action(RegisterAction)
    register(
        ctx: StateContext<UserStateModel>,
        { email, password }: RegisterAction
    ) {
        ctx.patchState({ loading: true, error: false, token: null });
        return this.apiService.register(email, password).pipe(
            tap((response) => {
                if (response === null) {
                    ctx.setState({ loading: false, error: true, token: null });
                } else {
                    ctx.patchState({ loading: false, error: false });
                }
            }),
            catchError((error) => {
                console.error(error);
                ctx.setState({ error: true, loading: false, token: null });
                return of(null);
            })
        );
    }
}
