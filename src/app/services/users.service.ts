import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httClient = inject(HttpClient)
  private baseUrl: string;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );


  public token;
  public identidad;
  public sesionSubject: BehaviorSubject<any>;
  public isAuthenticated: Observable<any>;
  public roleSubject: BehaviorSubject<any>;
  public roleUpdated: Observable<any>;
  
  constructor(public _http: HttpClient) { 
    this.baseUrl =  environment.baseUrl;
    var token = localStorage.getItem('token');
    var identidad = localStorage.getItem('identidad');
    var usuario = identidad ? JSON.parse(identidad) : null;

    this.sesionSubject = new BehaviorSubject<any>(token);
    this.isAuthenticated = this.sesionSubject.asObservable();
    this.roleSubject = new BehaviorSubject<any>(usuario ? usuario.rol : null);
    this.roleUpdated = this.roleSubject.asObservable();

 
  }
  login(fromValue: any){
      return firstValueFrom(
        this.httClient.post<any>(`${this.baseUrl}/login`,fromValue)
      )
  }

  logintrie(usuario, obtenerToken:any = null): Observable<any> {
    if (obtenerToken != null) {
      usuario.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(usuario);

    return this._http.post(this.baseUrl + '/login', params, {
      headers: this.headersVariable,
    })
    .pipe(map((res: any) => {
      if (obtenerToken) {
        localStorage.setItem('token', res.token);

        this.sesionSubject.next(res.token);
      } else {
        localStorage.setItem('identidad', JSON.stringify(res.usuario));

        this.roleSubject.next(res.usuario.rol);
      }

      return res;
    }));
  }

  loginEsclusa(usuario, obtenerToken:any = null): Observable<any> {
    if (obtenerToken != null) {
      usuario.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(usuario);

    return this._http.post(this.baseUrl + '/login', params, {
      headers: this.headersVariable,
    })
    .pipe(map((res: any) => {
      if (obtenerToken) {
        localStorage.setItem('token', res.token);

        this.sesionSubject.next(res.token);
      } else {
        localStorage.setItem('identidad', JSON.stringify(res.usuario));

        this.roleSubject.next(res.usuario.rol);
      }

      return res;
    }));
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


  
  getIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad')as string);
    if (identidad2 != undefined) {
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }

    return this.identidad;
  }

}
