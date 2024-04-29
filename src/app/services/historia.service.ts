import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  private baseUrl: string ;
  private conexion: string ;
  constructor(private httpClient: HttpClient) {
    this.baseUrl  = environment.baseUrl;
    this.conexion = '1';
  }

  evaluarEntorno() {
  
  }

  obtenerMainPage() {
    this.evaluarEntorno();
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/mostrarPaginaPrincipal`)
    );
  }

  obtenerHistoria() {
    this.evaluarEntorno();
    console.log(this.baseUrl)
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/mostrarHistoria`)
    );
  }

  editarHistoria(fromValue: any, idhistoria: any) {
    this.evaluarEntorno();
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/editarHistoria/${idhistoria}`, fromValue, this.createHeaders())
    );
  }

  sendPost(body: any, id: any): Observable<any> {
    this.evaluarEntorno();
    return this.httpClient.put(`${this.baseUrl}/editarPortada/${id}`, body);
  }

  sendback(body: FormData, id: any): Observable<any> {
    this.evaluarEntorno();
    return this.httpClient.put(`${this.baseUrl}/editarFondo/${id}`, body);
  }

  sendPortadaMovil(body: FormData, id: any): Observable<any> {
    this.evaluarEntorno();
    return this.httpClient.put(`${this.baseUrl}/editarMobilPortada/${id}`, body);
  }

  sendFondoMovil(body: FormData, id: any): Observable<any> {
    this.evaluarEntorno();
    return this.httpClient.put(`${this.baseUrl}/editarMobilFondo/${id}`, body);
  }

  createHeaders() {
    this.evaluarEntorno();
    return {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    };
  }
}
