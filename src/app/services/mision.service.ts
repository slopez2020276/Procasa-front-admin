import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MisionService {


  private htppCliente = inject(HttpClient)
  private baseUrl: string;

  constructor() { 
    this.baseUrl = 'http://localhost:3002/api'
  }

  obtenerMsion(){
    return firstValueFrom(
      this.htppCliente.get<any>(`${this.baseUrl}/mostrarMision`)
    )
  }


  editarMisionValor(id:any,fromValue:any){
    return firstValueFrom(
      this.htppCliente.put<any>(`${this.baseUrl}/editarMision/${id}`,fromValue,this.createHeaders())
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
