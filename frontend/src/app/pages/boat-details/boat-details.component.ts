import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import {
    BehaviorSubject,
    Observable,
    Subject,
    concatMap,
    filter,
    takeUntil,
} from 'rxjs';
import { BoatEditComponent } from 'src/app/components/boat-edit/boat-edit.component';
import { routeParams } from 'src/app/constants/route.constants';
import { BoatDto } from 'src/app/services/api.service';
import { LoadBoatDetailsAction } from 'src/app/state/boat-details/boat-details.actions';
import { BoatDetailsSelectors } from 'src/app/state/boat-details/boat-details.selectors';

@Component({
    selector: 'app-boat-details',
    standalone: true,
    imports: [CommonModule, RouterModule, BoatEditComponent],
    templateUrl: './boat-details.component.html',
    styleUrls: ['./boat-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoatDetailsComponent implements OnInit, OnDestroy {
    @Select(BoatDetailsSelectors.boatDetails)
    boatDetails$!: Observable<BoatDto>;

    open$ = new BehaviorSubject(false);

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private activatedRoute: ActivatedRoute, private store: Store) {}
    ngOnInit(): void {
        this.activatedRoute.paramMap
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((params) => {
                this.store.dispatch(
                    new LoadBoatDetailsAction(params.get(routeParams.boatId))
                );
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    edit() {
        this.open$.next(true);
    }

    getEditBoat$() {
        return this.open$.asObservable().pipe(
            filter((open) => open),
            concatMap(() => this.boatDetails$)
        );
    }
}
