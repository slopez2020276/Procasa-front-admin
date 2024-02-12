import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UneteEquipoService {

  private baseUrl :string;

  private httClient = inject(HttpClient)

  constructor() {
    this.baseUrl = 'http://localhost:3002/api'
   }

   otenerUneteEquipo(){
    return firstValueFrom(
      this.httClient.get<any>(`${this.baseUrl}/obtenerEmpleo`)
    )
   }

    crearUneteEquipo(fromValue:any){
      return firstValueFrom(
        this.httClient.post<any>(`${this.baseUrl}/agregarEmpleo`,fromValue)
      )
    }
}
