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

  ObtenerUbicacionesMt(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlw}/obtenerMeatouse`);
  }
  ObtenerUbicacionesPr(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlw}/obtenerProcasa`);
  }


  ObtenerUbicacionesxID(id:any): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlw}/obtenerUbiccacionxID/${id}`);
  }

  CrearUbicacion(body:FormData):Observable<any>{
    return this.httpClient.post(`${this.baseUrlw}/crearUbicacion`, body, this.createHeaders())
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
