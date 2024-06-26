import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class NoticasService {

  private httpClient = inject(HttpClient)
  private baseUrl: string ;
  constructor() {
    this.baseUrl = environment.baseUrl
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
      this.httpClient.get<any>(`${this.baseUrl}/obtenernoticiasid/${id}`)
    )
  }
  obtnenerNoticasAll(){
      return firstValueFrom(
        this.httpClient.get<any>(`${this,this.baseUrl}/otenerNoticciasAll`,this.createHeaders())
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
      this.httpClient.delete<any>(`${this.baseUrl}/eliminarNoticia/${id}`,this.createHeaders())
    )
  }
  sendEdit (body:FormData,id:any):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/editarNoticiasxId/${id}`, body)
  }
  

 

  createHeaders(){
    return   {
     headers: new HttpHeaders ({
       'Authorization': localStorage.getItem('token')!
     })
   }
 }

 sendPost(body:FormData):Observable<any>{
  return this.httpClient.post(`${this.baseUrl}/agregarNOticias`, body)
}

}
 