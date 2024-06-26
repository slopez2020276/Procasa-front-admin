import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, firstValueFrom } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UneteEquipoService {

  private baseUrl :string;

  private httClient = inject(HttpClient)

  constructor() {
    this.baseUrl = environment.baseUrl
   }

   otenerUneteEquipo(){
    return firstValueFrom(
      this.httClient.get<any>(`${this.baseUrl}/obtenerEmpleo`)
    )
   }

   obtenerPlazasFiltradas(){
    return firstValueFrom(
      this.httClient.get<any>(`${this.baseUrl}/obtenerPlazasFiltradas`)
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

    
    sendEditPlaza(id:any,body:FormData):Observable<any>{
      console.log(id)
      return this.httClient.put(`${this.baseUrl}/editarPlaza/${id}`, body)
    }


    agregarFunciones(id:any, formValue:any){
      return firstValueFrom(
        this.httClient.put<any>(`${this.baseUrl}/agregarFuncionesAUnete/${id}`, formValue)
      )
    }


    ObtenerPlazaid(id:any){
      return firstValueFrom(
        this.httClient.get<any>(`${this.baseUrl}/obtenerPlazaId/${id}`)
      )
    }

    editarPlaza(id:any, formValue:any){
      return firstValueFrom(
        this.httClient.put<any>(`${this.baseUrl}/editarPlaza/${id}`, formValue)
      )
    }
    
    eliminarPlaza(id:any){
      return firstValueFrom(
        this.httClient.delete<any>(`${this.baseUrl}/eliminarPlaza/${id}`)
      )
    }

    eliminarFuncion(id:any,indice:any){
      return firstValueFrom(
        this.httClient.put<any>(`${this.baseUrl}/eliminarFuncion/${id}/${indice}`,{})
      )
    
    }

    editarFuncion(indice:any,formValue:any,id:any){
      return firstValueFrom(
        this.httClient.put<any>(`${this.baseUrl}/editarPlazaV2/${id}/${indice}`, formValue)
      )
    }

    obtenerNombreUbiacion(){
      return firstValueFrom(
        this.httClient.get<any>(`${this.baseUrl}/obtnerUbiAllForUnete`)
      )
    }


    editarVisibiidad(id:any){
      return firstValueFrom(
        this.httClient.put<any>(`${this.baseUrl}/cambiarVisibilidad/${id}`,{})
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
