import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubsService {

  private httpClient = inject(HttpClient)
  private baseUrl :string;
  constructor() { 
    this.baseUrl = 'http://localhost:3002/api'
  }

  obtenerSubs(){
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/ObtenerSubs`)
    )
  }

  crearSub(fromValue:any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/agregarSubs`,fromValue,this.createHeaders())
    )
  }

  createHeaders(){
    return   {
     headers: new HttpHeaders ({
       'Authorization': localStorage.getItem('token')!
     })
   }
 }

 eliminarsub(id:any){
  return firstValueFrom(
    this.httpClient.delete<any>(`${this.baseUrl}/eliminarSubs/${id}`)
  )
 }
}
