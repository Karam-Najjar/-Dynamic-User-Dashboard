import { createAction, props } from '@ngrx/store';

import { IUser } from '../types/user.interface';

export const getUsers = createAction(
  '[Users] Get Users',
  props<{ page: number }>()
);

export const getUsersSuccess = createAction(
  '[Users] Get Users success',
  props<{ users: IUser[]; totalPages: number }>()
);

export const getUsersFailure = createAction(
  '[Users] Get Users failure',
  props<{ error: string }>()
);

export const searchUsers = createAction(
  '[Users] Search Users',
  props<{ id: number }>()
);
