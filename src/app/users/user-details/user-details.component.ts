import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';
import { IUser } from '../../store/types/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  user!: IUser;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.fetchUserDetails();
    });
  }

  fetchUserDetails(): void {
    this.isLoading = true;
    this.userService.getUserDetails(this.userId).subscribe({
      next: (users: any) => {
        this.user = users.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'An error occurred while fetching the user';
        alert(error);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
