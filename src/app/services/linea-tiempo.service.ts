import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

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

  obtenerLineaxID(idLinea:any){

    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/obtenerLineaXid/${idLinea}`,this.createHeaders())
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

  eliminarLineaTIempo(idLinea:any){
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/eliminarLineaTiempo/${idLinea}`,this.createHeaders())
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


