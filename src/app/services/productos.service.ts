import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, firstValueFrom } from 'rxjs';

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

  obtenerProducto(id:any){
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/obtenerProducto/${id}`))
  }
  
  CrearProducto(body:FormData):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/crearProducto`, body, this.createHeaders())
  }



 EditarProducto(body:FormData,id:any):Observable<any>{
  return this.httpClient.put<any>(`${this.baseUrl}/EditarProducto/${id}`,body, this.createHeaders() )
 }


 createHeaders(){
  return   {
   headers: new HttpHeaders ({
     'Authorization': localStorage.getItem('token')!
   })
 }
}


eliminarProductos(id:any){
return firstValueFrom(this.httpClient.delete(`${this.baseUrl}/eliminarProducto/${id}`, this.createHeaders()))


}


}
