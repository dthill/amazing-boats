import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { BoatEditComponent } from 'src/app/components/boat-edit/boat-edit.component';
import { routeConstants } from 'src/app/constants/route.constants';
import { BoatDto } from 'src/app/services/api.service';
import {
    AddBoatAction,
    DeleteBoatAction,
    LoadBoatsAction,
} from 'src/app/state/boats/boats.actions';
import { BoatsSelectors } from 'src/app/state/boats/boats.selectors';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        BoatEditComponent,
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    @ViewChild('dialog')
    dialog!: ElementRef;

    @Select(BoatsSelectors.boats)
    boats$!: Observable<BoatDto[]>;

    @Select(BoatsSelectors.loading)
    loading$!: Observable<boolean>;

    @Select(BoatsSelectors.error)
    error$!: Observable<boolean>;

    addBoatForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
    });

    readonly routeConstants = routeConstants;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(new LoadBoatsAction());
    }

    get addName() {
        return this.addBoatForm.controls.name;
    }

    get addDescription() {
        return this.addBoatForm.controls.description;
    }

    addBoat() {
        if (this.addName.value && this.addDescription.value) {
            this.store
                .dispatch(
                    new AddBoatAction(
                        this.addName.value,
                        this.addDescription.value
                    )
                )
                .pipe(take(1))
                .subscribe(() => {
                    if (!this.store.selectSnapshot(BoatsSelectors.error)) {
                        this.addBoatForm.reset({ name: '', description: '' });
                    }
                });
        }
    }
    deleteBoat(id: number) {
        this.store.dispatch(new DeleteBoatAction(id));
    }
}
