import { HttpClient } from '@angular/common/http';
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


}
