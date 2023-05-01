import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { routeConstants } from 'src/app/constants/route.constants';
import { LogoutAction } from 'src/app/state/user/user.actions';
import { UserSelectors } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  readonly routeConstants = routeConstants;

  @Select(UserSelectors.loggedIn)
  loggedIn$!: Observable<boolean>;

  constructor(private store: Store, private router: Router) {}

  login() {
    this.router.navigate([routeConstants.login]);
  }

  logout() {
    this.store
      .dispatch(new LogoutAction())
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate([routeConstants.login]);
      });
  }
}
