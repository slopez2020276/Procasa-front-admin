import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineaTiempoService {
  private httpClient = inject(HttpClient)
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3002/api'
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
    this.httpClient.post<any>(`${this.baseUrl}/crearAnio`,fromValue,this.createHeaders())
  )

}

}

