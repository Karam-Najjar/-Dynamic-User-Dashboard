// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'app-user-details',
//   templateUrl: './user-details.component.html',
//   styleUrl: './user-details.component.css',
// })
// export class UserDetailsComponent implements OnInit {
//   constructor(
//     private route: ActivatedRoute,
//     private userService: UserService
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       const userId = +params['id']; // Extract user ID from route parameters
//       this.fetchUserDetails(userId);
//     });
//   }

//   fetchUserDetails(userId: number): void {
//     this.userService.getUserDetails(userId).subscribe((user) => {
//       // Handle user details
//       console.log(user);
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.interface';

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
