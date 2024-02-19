import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  private httpClient = inject(HttpClient)
  private baseUrl :string;
  constructor() { 
    this.baseUrl = 'http://localhost:3002/api'
  }

  obtenerProductos(){
    return this.httpClient.get<any>(`${this.baseUrl}/ObtenerProductos`)
  }

}
