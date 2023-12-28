import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticasService {

  private httpClient = inject(HttpClient)
  private baseUrl: string ;
  constructor() {
    this.baseUrl = 'http://localhost:3002/api'
   }

   obtenerMainPage(){
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/mostrarPaginaPrincipal`)
    )
  }
}
