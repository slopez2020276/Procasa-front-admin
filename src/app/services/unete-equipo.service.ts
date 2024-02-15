import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UneteEquipoService {

  private baseUrl :string;

  private httClient = inject(HttpClient)

  constructor() {
    this.baseUrl = 'http://localhost:3002/api'
   }

   otenerUneteEquipo(){
    return firstValueFrom(
      this.httClient.get<any>(`${this.baseUrl}/obtenerEmpleo`)
    )
   }

    crearUneteEquipo(fromValue:any){
      console.log(fromValue)
      return firstValueFrom(
        this.httClient.post<any>(`${this.baseUrl}/crearEmpleo`, fromValue )
        
      )
    }

    sendPost(body:FormData):Observable<any>{
      return this.httClient.post(`${this.baseUrl}/agregarEventoLineadeTiempo`, body)
    }
    

    sendCreatePlaza(body:FormData):Observable<any>{
      return this.httClient.post(`${this.baseUrl}/crearEmpleo`, body)
    }

    agregarFunciones(id:any, formValue:any){
      return firstValueFrom(
        this.httClient.put<any>(`${this.baseUrl}/agregarFuncionesAUnete/${id}`, formValue)
      )
    }
    
}
