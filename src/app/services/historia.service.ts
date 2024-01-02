import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

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

  obtenerHistoria(){
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/mostrarHistoria`)
    )
  }

  editarHistoria(fromValue:any,idhistoria){

   
   
    let id = idhistoria
    console.log(idhistoria)
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/editarHistoria/${id}`,fromValue, this.createHeaders())
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
