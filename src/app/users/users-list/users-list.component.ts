import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import {
  isLoadingSelector,
  errorSelector,
  usersSelector,
  selectTotalUsers,
} from '../../store/selectors';
import { AppStateInterface } from '../../types/appState.interface';
import { IUser } from '../../store/types/user.interface';
import * as UsersActions from '../../store/actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  users: IUser[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading: boolean = false;
  error: string | null = null;

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  users$!: Observable<IUser[]>;
  totalUsers$!: Observable<number>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.users$ = this.store.pipe(select(usersSelector));
    this.totalUsers$ = this.store.pipe(select(selectTotalUsers));
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.store.dispatch(UsersActions.getUsers({ page: this.currentPage }));
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchUsers();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchUsers();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
