import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from './types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`https://reqres.in/api/users?page=${page}`);
  }

  getUserDetails(id: number): Observable<any> {
    return this.http.get<IUser>(`https://reqres.in/api/users/${id}`);
  }
}
