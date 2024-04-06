import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<User[]> {
    return this.http.get<User[]>(`https://reqres.in/api/users?page=${page}`);
  }

  getUserDetails(id: number): Observable<any> {
    return this.http.get<User>(`https://reqres.in/api/users/${id}`);
  }
}
