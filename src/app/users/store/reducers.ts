import { createReducer, on } from '@ngrx/store';

import * as UsersActions from './actions';
import { UsersStateInterface } from '../types/usersState.interface';

export const initialState: UsersStateInterface = {
  isLoading: false,
  users: [],
  error: null,
  totalPages: 0,
};

export const reducers = createReducer(
  initialState,
  on(UsersActions.getUsers, (state) => ({ ...state, isLoading: true })),
  on(UsersActions.getUsersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: action.users,
    totalPages: action.totalPages,
  })),
  on(UsersActions.getUsersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(UsersActions.searchUsers, (state, { id }) => ({
    ...state,
    searchQuery: id,
  }))
);
