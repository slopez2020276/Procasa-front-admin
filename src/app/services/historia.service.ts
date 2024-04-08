import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  private httpClient = inject(HttpClient)
  private baseUrl: string ;
  constructor() {
    this.baseUrl = 'https://enchanting-kilt-pike.cyclic.app/api'
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
     idhistoria
    console.log(idhistoria)
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/editarHistoria/${idhistoria}`,fromValue, this.createHeaders())
    )
  }
  sendPost(body:any,id:any):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/editarPortada/${id}`, body)
  }
  sendback(body:FormData,id:any):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/editarFondo/${id}`, body)
  }
  createHeaders(){
     return   {
      headers: new HttpHeaders ({
        'Authorization': localStorage.getItem('token')!
      })
    }
  }
}
