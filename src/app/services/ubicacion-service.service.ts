import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionServiceService {
  private baseUrlw = 'http://localhost:3002/api';

  constructor(private httpClient: HttpClient) {}

  ObtenerUbicaciones(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlw}/obtenerUbicaciones`);
  }

  CrearUbicacion(body: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlw}/crearUbicacion`, body);
  }
}
