import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MarcasService {


  private htppCliente = inject(HttpClient)
  private baseUrl: string;


  constructor() { 
    this.baseUrl = 'https://clever-rugby-shirt-bear.cyclic.app/api'
  }

  obtenerMarcas(){
    return firstValueFrom(
      this.htppCliente.get<any>(`${this.baseUrl}/mostrarMarcas`)
    )
  }

  CrearMarca(body:FormData):Observable<any>{
    return this.htppCliente.post(`${this.baseUrl}/agregarMarca`, body)
  }
  ObtenerMarcaId(id:any){
    return firstValueFrom(
      this.htppCliente.get<any>(`${this.baseUrl}/obtenerMarcaXid/${id}`)
    )
  }


 

  editarMarca(id:any,body:FormData):Observable<any>{
    return this.htppCliente.put(`${this.baseUrl}/editarMarca/${id}`, body)
  }
  


  eliminarMarca(id:any){
    return firstValueFrom(
      this.htppCliente.delete<any>(`${this.baseUrl}/eliminarMarca/${id}`)
    )
  }
}
