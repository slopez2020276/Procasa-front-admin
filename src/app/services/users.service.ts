import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httClient = inject(HttpClient)
  private baseUrl: string;

  constructor() { 
    this.baseUrl = 'http://localhost:3002/api'
 
  }
  login(fromValue: any){
      return firstValueFrom(
        this.httClient.post<any>(`${this.baseUrl}/login`,fromValue)
      )
  }

  obtener(){
    return firstValueFrom(
      this.httClient.get<any>(`${this.baseUrl}/obtenerUsuarios`)
    )
  }

  obtenerxId(id:any){

    return firstValueFrom(
      this.httClient.get<any>(`${this.baseUrl}/obtenerUsuarioId/${id}`)
    )
  }

  editarUser(fromValue:any,id){
    return firstValueFrom(
      this.httClient.put<any>(`${this.baseUrl}/editarUsuario/${id}`,fromValue)
    )
  }

  registrarUser(forms:any){
    return firstValueFrom(
      this.httClient.post<any>(`${this.baseUrl}/registrarUsuario`,forms)
    )
  }
}
