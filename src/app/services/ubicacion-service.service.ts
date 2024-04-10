import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionServiceService {
  private baseUrlw = 'https://enchanting-kilt-pike.cyclic.app/api';
  private httClient = inject(HttpClient)
  

  constructor(private httpClient: HttpClient) {}

  ObtenerUbicaciones(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlw}/obtenerUbicaciones`);
  }

  ObtenerUbicacionesMt(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlw}/obtenerMeatouse`);
  }
  ObtenerUbicacionesPr(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlw}/obtenerProcasa`);
  }


  ObtenerUbicacionesxID(id:any): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlw}/obtenerUbiccacionxID/${id}`);
  }

  CrearUbicacion(body:FormData):Observable<any>{
    return this.httpClient.post(`${this.baseUrlw}/crearUbicacion`, body, this.createHeaders())
  }
  

  ObtenerUbicaionesAdmin(){
    return firstValueFrom(
      this.httClient.get<any>(`${this.baseUrlw}/obtenerUbicaciones`)
    )
  }

  ObtenerUbicaionesxid(id:any){
    return firstValueFrom(
      this.httClient.get<any>(`${this.baseUrlw}//obtenerUbiccacionxID/${id}`)
    )
  }
  sendEdit (body:FormData,id:any):Observable<any>{
    return this.httpClient.put(`${this.baseUrlw}/editarUbicacion/${id}`, body)
  }


eliminarUbicacion(id:any){
  return firstValueFrom(this.httpClient.delete(`${this.baseUrlw}/eliminarUbicacion/${id}`, this.createHeaders()))

}


obtenerProcas(){
  return firstValueFrom(this.httpClient.get<any>(`${this.baseUrlw}/obtenerUbicacionesProcasa`))

}
obtenerprocasacdd(){
  return firstValueFrom(this.httpClient.get<any>(`${this.baseUrlw}/obtenerProcasacdd`))
}

obtenermeatousegrab(){
  return firstValueFrom(this.httpClient.get<any>(`${this.baseUrlw}/obtnerMeathouseGrabandgo`))
}

obtenermeatHouseCarnicera(){
  return firstValueFrom(this.httpClient.get<any>(`${this.baseUrlw}/obtenerMeathouseCarniceria`))
}
obtenerEconocarnes(){
  return firstValueFrom(this.httpClient.get<any>(`${this.baseUrlw}/obtenerEconocarnes`))
}

  createHeaders(){
    return   {
     headers: new HttpHeaders ({
       'Authorization': localStorage.getItem('token')!
     })
   }
  }
}
