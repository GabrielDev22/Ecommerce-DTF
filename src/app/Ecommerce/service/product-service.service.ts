import { Injectable } from '@angular/core';
import { envirotment } from '../../../environments/enviroments';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDTO } from '../model/productModel';

const PRODUCT_URI = `${envirotment.apiUrl}/product`;

@Injectable({
  providedIn: 'root'
})

export class ProductServiceService {

  constructor(
    private http : HttpClient,
    private router: Router
  ) { }

  getAllProduct(): Observable<ProductDTO[]>{
    let headers = new HttpHeaders();
    if (typeof window !== 'undefined') { 
      const token = localStorage.getItem('jwt');
      headers = headers.set('Authorization', `Bearer ${token || ''}`);
    }
    return this.http.get<ProductDTO[]>(`${PRODUCT_URI}/getAll`, {headers});
  }



}
