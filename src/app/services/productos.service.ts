import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  private httpClient = inject(HttpClient)
  private baseUrl :string;
  constructor() { 
    this.baseUrl = 'https://enchanting-kilt-pike.cyclic.app/api'
  }

  obtenerProductos(){
    return this.httpClient.get<any>(`${this.baseUrl}/ObtenerProductos`)
  }
  
  CrearUbicacion(body:FormData):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/crearProducto`, body, this.createHeaders())
  }

  createHeaders(){
    return   {
     headers: new HttpHeaders ({
       'Authorization': localStorage.getItem('token')!
     })
   }
 }
}
