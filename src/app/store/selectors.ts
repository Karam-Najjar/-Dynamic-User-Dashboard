import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.users;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const usersSelector = createSelector(selectFeature, (state) =>
  state.users.filter(
    (user) =>
      !state.searchQuery?.toString() ||
      user.id.toString().includes(state.searchQuery?.toString())
  )
);

export const selectTotalUsers = createSelector(
  selectFeature,
  (state) => state.totalPages
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);
