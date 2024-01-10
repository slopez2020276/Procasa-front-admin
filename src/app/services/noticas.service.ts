import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Form } from '@angular/forms';
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
      this.httpClient.get<any>(`${this.baseUrl}/obtenernoticiasid/${id}`,this.createHeaders())
    )
  }
  
  editarnoticas(id:any,fromValue:any){ 
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/editarNoticiasxId/${id}`,fromValue,this.createHeaders())
    )

  }

  crearNoticia (fromValue:any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/agregarNOticias`,fromValue)
    )
  } 
   EliminarNoticia (id){
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/eliminarNoticia/${id}`)
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
