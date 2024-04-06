import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserCardComponent } from './user-card/user-card.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@NgModule({
  declarations: [UsersListComponent, UserDetailsComponent, UserCardComponent],
  imports: [HttpClientModule, FormsModule, SpinnerComponent, CommonModule],
})
export class UserModule {}
