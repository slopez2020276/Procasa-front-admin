import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LineaTiempoService {
  private httpClient = inject(HttpClient)
  private baseUrl: string;

  constructor() {
    this.baseUrl = environment.baseUrl
  }


  obtenerLineaTiempo(){
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/mostrarLineaTiempo`)
    )
  }

  obtenerLineaxID(idAnio:any,idLinea:any){

    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/obtenerEventoXid/${idAnio}/${idLinea}`,this.createHeaders())
    )

  }

  editarLineaforID(idLinea:any,fromValue: any){
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/editarLineaTiempo/${idLinea}`,fromValue,this.createHeaders())
    )
  }

  crearEventoLineaTiempo(fromValue:any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/agregarEventoLineadeTiempo`,fromValue,this.createHeaders())
    )
  }

  eliminarLineaTIempo(idAnio:any,idLinea:any){
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/eliminarEventoLineaTiempo/${idAnio}/${idLinea}`,this.createHeaders())
    )
  }

  createHeaders(){
    return   {
     headers: new HttpHeaders ({
       'Authorization': localStorage.getItem('token')!
     })
   }
 }

 sendPost(idAnio:any,body:FormData):Observable<any>{
  return this.httpClient.put(`${this.baseUrl}/agregarEventoLineaTiempo/${idAnio}`, body)
}

sendEdit(body:FormData,idanio:any,id:any):Observable<any>{
  return this.httpClient.put(`${this.baseUrl}/editarEventoLineaTiempo/${idanio}/${id}`, body)
}

crearAnio(fromValue:any){
  return firstValueFrom(
    this.httpClient.post<any>(`${this.baseUrl}/CrearAnio`,fromValue,this.createHeaders())
  )

}


eliminarAnio(id:any){
  return firstValueFrom(
    this.httpClient.delete<any>(`${this.baseUrl}/EliminarAnio/${id}`,this.createHeaders())
   
  )
}


editarAnio(id:any,fromValue:any){
  return firstValueFrom(
    this.httpClient.put<any>(`${this.baseUrl}/ediatarAnio/${id}`,fromValue)
  )
}

}

