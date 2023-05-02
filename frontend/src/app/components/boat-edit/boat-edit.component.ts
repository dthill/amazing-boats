import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { BoatDto } from 'src/app/services/api.service';
import { EditBoatDetailsAction } from 'src/app/state/boat-details/boat-details.actions';
import { BoatDetailsSelectors } from 'src/app/state/boat-details/boat-details.selectors';

@Component({
    selector: 'app-boat-edit',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './boat-edit.component.html',
    styleUrls: ['./boat-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoatEditComponent implements OnInit, OnDestroy {
    @ViewChild('dialog')
    dialog!: ElementRef;

    @Input()
    boat$!: Observable<BoatDto>;

    @Select(BoatDetailsSelectors.error)
    error$!: Observable<boolean>;

    @Select(BoatDetailsSelectors.loading)
    loading$!: Observable<boolean>;

    editBoatForm = new FormGroup({
        id: new FormControl({ value: 0, disabled: true }),
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
    });

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.boat$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((boat) => {
            this.openEditBoatDialog(boat);
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    get editId() {
        return this.editBoatForm.controls.id;
    }

    get editName() {
        return this.editBoatForm.controls.name;
    }

    get editDescription() {
        return this.editBoatForm.controls.description;
    }

    openEditBoatDialog(boat: BoatDto) {
        this.editBoatForm.reset({
            id: boat.id,
            name: boat.name,
            description: boat.description,
        });
        this.dialog.nativeElement.showModal();
    }

    handleClickDialog(event: Event) {
        if (event.target !== this.dialog.nativeElement) {
            return;
        }
        this.closeDialog();
    }

    closeDialog() {
        this.editBoatForm.reset();
        this.dialog.nativeElement.close();
    }

    editBoat() {
        if (
            this.editName.value &&
            this.editDescription.value &&
            this.editId.value
        ) {
            this.store
                .dispatch(
                    new EditBoatDetailsAction(
                        this.editId.value,
                        this.editName.value,
                        this.editDescription.value
                    )
                )
                .pipe(take(1))
                .subscribe(() => {
                    if (
                        !this.store.selectSnapshot(BoatDetailsSelectors.error)
                    ) {
                        this.closeDialog();
                    }
                });
        }
    }
}
