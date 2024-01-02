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

  }
  

  createHeaders(){
    return   {
     headers: new HttpHeaders ({
       'Authorization': localStorage.getItem('token')!
     })
   }
 }
}


