import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { BoatsState } from './boats.state';
import { BoatsAction } from './boats.actions';

describe('Boats actions', () => {
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([BoatsState])]
        }).compileComponents();
        store = TestBed.inject(Store);
    });

    it('should create an action and add an item', () => {
        store.dispatch(new BoatsAction('item-1'));
        store.select(state => state.boats.items).subscribe((items: string[]) => {
            expect(items).toEqual(jasmine.objectContaining([ 'item-1' ]));
        });
    });

});
