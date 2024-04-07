import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserCardComponent } from './user-card/user-card.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { reducers } from './store/reducers';
import { UsersEffects } from './store/effects';
import { CacheUserInterceptor } from './interceptors/cache-user-interceptor.service';

@NgModule({
  declarations: [UsersListComponent, UserDetailsComponent, UserCardComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    SpinnerComponent,
    CommonModule,
    StoreModule.forFeature('users', reducers),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheUserInterceptor, multi: true },
  ],
})
export class UserModule {}
