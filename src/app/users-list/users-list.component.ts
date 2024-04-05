import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { UserService } from '../user.service';
import { User } from '../user.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  users: User[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.userService
      .getUsers(this.currentPage)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (users: any) => {
          this.users = users.data;
          this.totalPages = users.total_pages;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'An error occurred while fetching users.';
          this.isLoading = false;
          alert(error);
        },
      });
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
