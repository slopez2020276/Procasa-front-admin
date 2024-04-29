import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MainpageService {

  private httClient = inject(HttpClient)
  private baseUrl: string;

  constructor() { 
    this.baseUrl = environment.baseUrl
 
  }
  obtenerMainPage(){
      return firstValueFrom(
        this.httClient.get<any>(`${this.baseUrl}/mostrarPaginaPrincipal`)
      )
  }
}
