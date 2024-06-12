import { Injectable } from '@angular/core';
import { envirotment } from '../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { CreateUser } from '../model/authModel';

const APIURL = envirotment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  
  private authUser =  `${APIURL}/auth`;

  constructor(
    private http : HttpClient,
    private router: Router
  ) { }

  createUser(createUser: CreateUser): Observable<any>{
    return this.http.post<any>(`${this.authUser}/create`, createUser);
  }


}
