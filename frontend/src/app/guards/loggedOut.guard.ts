import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { routeConstants } from '../constants/route.constants';
import { UserSelectors } from '../state/user/user.selectors';

export const loggedOutGuard = () => {
    const store = inject(Store);
    const loggedIn = store.selectSnapshot(UserSelectors.loggedIn);
    if (!loggedIn) {
        return true;
    }
    const router = inject(Router);
    return router.navigate([routeConstants.home]);
};
