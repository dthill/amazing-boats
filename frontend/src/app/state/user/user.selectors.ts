import { Selector } from '@ngxs/store';
import { UserState } from './user.state';
import { UserStateModel } from './user.state-model';

export class UserSelectors {
    @Selector([UserState])
    static token(state: UserStateModel): string | null {
        return state.token;
    }

    @Selector([UserState])
    static loggedIn(state: UserStateModel): boolean {
        return !!state.token;
    }

    @Selector([UserState])
    static loading(state: UserStateModel): boolean {
        return state.loading;
    }

    @Selector([UserState])
    static error(state: UserStateModel): boolean {
        return state.error;
    }
}
