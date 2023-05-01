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
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { BoatDto } from 'src/app/services/api.service';
import {
  AddBoatAction,
  DeleteBoatAction,
  EditBoatAction,
  LoadBoatsAction,
  ResetBoatErrorAction,
} from 'src/app/state/boats/boats.actions';
import { BoatsSelectors } from 'src/app/state/boats/boats.selectors';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  editBoatForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

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

  get editId() {
    return this.editBoatForm.controls.id;
  }

  get editName() {
    return this.editBoatForm.controls.name;
  }

  get editDescription() {
    return this.editBoatForm.controls.description;
  }

  addBoat() {
    if (this.addName.value && this.addDescription.value) {
      this.store
        .dispatch(
          new AddBoatAction(this.addName.value, this.addDescription.value)
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

  openEditBoatDialoge(id: number) {
    const boat = this.store
      .selectSnapshot(BoatsSelectors.boats)
      .find((boat) => boat.id === id);
    if (!boat) {
      throw new Error('Could not find Boat with id ' + id);
    }
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
    this.store.dispatch(new ResetBoatErrorAction());
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
          new EditBoatAction(
            this.editId.value,
            this.editName.value,
            this.editDescription.value
          )
        )
        .pipe(take(1))
        .subscribe(() => {
          if (!this.store.selectSnapshot(BoatsSelectors.error)) {
            this.closeDialog();
          }
        });
    }
  }
}
