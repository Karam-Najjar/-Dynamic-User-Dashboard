import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Store, select } from '@ngrx/store';

import {
  isLoadingSelector,
  errorSelector,
  usersSelector,
  selectTotalUsers,
} from '../store/selectors';
import { AppStateInterface } from '../../types/appState.interface';
import { IUser } from '../types/user.interface';
import * as UsersActions from '../store/actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  currentPage = 1;

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  users$!: Observable<IUser[]>;
  totalPages$!: Observable<number>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.users$ = this.store.pipe(select(usersSelector));
    this.totalPages$ = this.store.pipe(select(selectTotalUsers));
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.store.dispatch(UsersActions.getUsers({ page: this.currentPage }));
  }

  nextPage(): void {
    this.totalPages$.pipe(take(1)).subscribe((totalPages) => {
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.fetchUsers();
      }
    });
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchUsers();
    }
  }
}
