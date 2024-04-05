import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  user!: any;

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
    this.userService.getUserDetails(this.userId).subscribe((user) => {
      this.user = user.data;
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
