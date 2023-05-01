import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { routeConstants } from 'src/app/constants/route.constants';
import { LoginAction } from 'src/app/state/user/user.actions';
import { UserSelectors } from 'src/app/state/user/user.selectors';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @Select(UserSelectors.error)
  error$!: Observable<boolean>;

  @Select(UserSelectors.loading)
  loading$!: Observable<boolean>;

  readonly routeConstants = routeConstants;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store, private router: Router) {}

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.email.value && this.password.value) {
      this.store
        .dispatch(new LoginAction(this.email.value, this.password.value))
        .pipe(take(1))
        .subscribe(() => {
          if (!this.store.selectSnapshot(UserSelectors.error)) {
            this.router.navigate([routeConstants.home]);
          }
        });
    }
  }
}
