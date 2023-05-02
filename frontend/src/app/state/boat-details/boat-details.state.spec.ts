import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { LoadBoatDetailsAction } from './boat-details.actions';
import { BoatDetailsState } from './boat-details.state';

describe('BoatDetails actions', () => {
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([BoatDetailsState])],
        }).compileComponents();
        store = TestBed.inject(Store);
    });

    it('should create an action and add an item', () => {
        store.dispatch(new LoadBoatDetailsAction('item-1'));
        store
            .select((state) => state.boatDetails.items)
            .subscribe((items: string[]) => {
                expect(items).toEqual(jasmine.objectContaining(['item-1']));
            });
    });
});
