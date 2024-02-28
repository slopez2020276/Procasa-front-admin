import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValoresService {
  private httpClient = inject(HttpClient)
  private baseUrl :string;

  constructor() {
    this.baseUrl = 'https://enchanting-kilt-pike.cyclic.app/api'
  
   }

   obtenerValores(){
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/mostrarvalores`)
    )
   }

   editarValores(id:any,fromValue){
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/editarvalores/${id}`,fromValue,this.createHeaders())
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
