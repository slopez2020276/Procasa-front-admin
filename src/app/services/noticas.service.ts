import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  obtenerNoticas(){
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/ObtnerNoticias`)
    )
  }
  obtenerxID(id:any){
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/obtenernoticiasxID/${id}`,this.createHeaders())
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
