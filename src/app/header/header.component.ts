import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStateInterface } from '../types/appState.interface';
import * as UsersActions from '../users/store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private store: Store<AppStateInterface>) {}
  search(event: any) {
    this.store.dispatch(UsersActions.searchUsers({ id: event?.value }));
  }
}
