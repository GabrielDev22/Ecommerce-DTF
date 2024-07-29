import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirotment } from '../../../environments/enviroments';


const FILE_URI = `${envirotment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class FilesStorageImagenService {

  constructor(
    private http : HttpClient,
  ) { }

  getImagenesFilesStorage(imageName: string): Observable<Blob>{
    let headers = new HttpHeaders();
    if (typeof window !== 'undefined') { 
      const token = localStorage.getItem('jwt');
      headers = headers.set('Authorization', `Bearer ${token || ''}`);
    }
    return this.http.get(`${FILE_URI}${imageName}`,{
      headers: headers,
      responseType: 'blob'
    })
  }

}
