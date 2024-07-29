import { Injectable } from '@angular/core';
import { envirotment } from '../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CreateUser, LoginRequest, TokenRefreshRequest } from '../model/authModel';
import { Router } from '@angular/router';

const APIURL = envirotment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private authUser =  `${APIURL}/auth`;

  constructor(
    private http : HttpClient,
    private router: Router
  ) { }

  createUser(createUser: CreateUser): Observable<any>{
    return this.http.post<any>(`${this.authUser}/create`, createUser);
  }
  
  login(loginRequest: LoginRequest): Observable<any>{
    return this.http.post<any>(`${this.authUser}/login`, loginRequest).pipe(
      tap(response => {
        localStorage.setItem('jwt', response.jwt);
      })
    )
  }

  logout(): Observable<any>{
    return this.http.post<any>(`${this.authUser}/logout`, null).pipe(
      tap(() => {
        localStorage.removeItem('jwt');
      })
    )
  }

  refreshToken(): Observable<any>{
    const jwt = localStorage.getItem('jwt');
    return this.http.post<any>(`${this.authUser}/refreshToken`, {jwt}).pipe(
      tap(response => {
        localStorage.setItem('jwt', response.jwt);
      })
    ); 
  }

}
