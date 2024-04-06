import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UserService } from '../users/user.service';
import * as UsersActions from './actions';

@Injectable()
export class UsersEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsers),
      mergeMap((pagination) => {
        return this.userService.getUsers(pagination.page).pipe(
          map((data: any) =>
            UsersActions.getUsersSuccess({
              users: data.data,
              totalPages: data.total_pages,
            })
          ),
          catchError((error) =>
            of(UsersActions.getUsersFailure({ error: error.message }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
