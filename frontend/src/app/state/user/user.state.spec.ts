import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { LoginAction } from './user.actions';
import { UserState } from './user.state';

describe('User actions', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UserState])],
    }).compileComponents();
    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    store.dispatch(new LoginAction('item-1'));
    store
      .select((state) => state.user.items)
      .subscribe((items: string[]) => {
        expect(items).toEqual(jasmine.objectContaining(['item-1']));
      });
  });
});
