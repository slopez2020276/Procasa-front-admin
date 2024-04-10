import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainpageService {

  private httClient = inject(HttpClient)
  private baseUrl: string;

  constructor() { 
    this.baseUrl = 'https://enchanting-kilt-pike.cyclic.app/api'
 
  }
  obtenerMainPage(){
      return firstValueFrom(
        this.httClient.get<any>(`${this.baseUrl}/mostrarPaginaPrincipal`)
      )
  }
}
