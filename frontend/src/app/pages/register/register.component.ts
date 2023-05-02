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
import { RegisterAction } from 'src/app/state/user/user.actions';
import { UserSelectors } from 'src/app/state/user/user.selectors';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
    @Select(UserSelectors.error)
    error$!: Observable<boolean>;

    @Select(UserSelectors.loading)
    loading$!: Observable<boolean>;

    registerForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    registrationError = false;

    constructor(private store: Store, private router: Router) {}

    get email() {
        return this.registerForm.controls.email;
    }

    get password() {
        return this.registerForm.controls.password;
    }

    register() {
        if (this.email.value && this.password.value) {
            this.store
                .dispatch(
                    new RegisterAction(this.email.value, this.password.value)
                )
                .pipe(take(1))
                .subscribe(() => {
                    if (!this.store.selectSnapshot(UserSelectors.error)) {
                        alert('Succesfully registered. Please login.');
                        this.router.navigate([routeConstants.login]);
                    }
                });
        }
    }
}
