import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SubsService {

  private httpClient = inject(HttpClient)
  private baseUrl :string;
  constructor() { 
    this.baseUrl = environment.baseUrl
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



 eliminarsub(id:any){
  return firstValueFrom(
    this.httpClient.delete<any>(`${this.baseUrl}/eliminarSubs/${id}`,this.createHeaders())
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
