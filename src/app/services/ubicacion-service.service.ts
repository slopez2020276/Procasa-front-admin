import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionServiceService {
  private baseUrlw = 'http://localhost:3002/api';
  private httClient = inject(HttpClient)
  

  constructor(private httpClient: HttpClient) {}

  ObtenerUbicaciones(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlw}/obtenerUbicaciones`);
  }

  CrearUbicacion(body: FormData) {

    return  firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrlw}/crearUbicacion`, body,this.createHeaders())
    )
  }

  ObtenerUbicaionesAdmin(){
    return firstValueFrom(
      this.httClient.get<any>(`${this.baseUrlw}/obtenerUbicaciones`)
    )
  }

  createHeaders(){
    return   {
     headers: new HttpHeaders ({
       'Authorization': localStorage.getItem('token')!
     })
   }
  }
}
