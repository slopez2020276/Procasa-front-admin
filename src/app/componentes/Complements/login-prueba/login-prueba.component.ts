import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserPruebaService } from '../../../services/user-prueba.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-prueba',
  templateUrl: './login-prueba.component.html',
  styleUrl: './login-prueba.component.css'
})
export class LoginPruebaComponent {
  formulario: FormGroup
  data:string= 'aa'

  usersService = inject(UserPruebaService)
  router = inject(Router)

  constructor(){
    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      obtenerToken: new FormControl()
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  MessageAlert(message: string, type: number, time: number){
    document.getElementById('container-alert')?.classList.add('show')
    const innerMessage = document.getElementById('inner-message')
    if (innerMessage) {
      innerMessage.innerHTML = message;

      if(type===1){
        document.getElementById('time')?.classList.add('green')
      }else if(type===2){
        document.getElementById('time')?.classList.add('red')
      }else if(type===3){
        document.getElementById('time')?.classList.add('orange')
      }
      setTimeout(function(){
        document.getElementById('container-alert')?.classList.remove('show')
        document.getElementById('time')?.classList.remove('green')
        document.getElementById('time')?.classList.remove('red')
        document.getElementById('time')?.classList.remove('orange')
    },time)
    }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async onSubmit(){
  const response = await this.usersService.login(this.formulario.value)
  this.data = response.token
  
    this.data = response.token
    if(response.message ){
      console.log(response.message)
      this.MessageAlert(response.message,3,2000)
      //error con alertas
    }else if (response.token){
      localStorage.setItem('token', response.token)
      // this.router.navigate(['admin/Principal'])
      alert("Autenticación Correcta!")
    }
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  getTokenPromesa(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.logintrie(this.formulario.value, 'true').subscribe(
        (response) => {
          resolve(response)
        },
        (error) => {
          console.log(<any>error)
        }
      )
    })
  }

  login() {
    this.usersService.logintrie(this.formulario.value).subscribe(
      (response) => {
        this.getTokenPromesa().then((respuesta) => {

          let identidad = this.usersService.getIdentidad()
              if(identidad.rol === 'marketing'|| identidad.rol === 'Admin' ){
                // this.router.navigate(['admin/Principal'])
                alert("Autenticación Correcta!")

              }if(identidad.rol === 'rh'){
                // this.router.navigate(['admin/Equipo'])
                alert("Autenticación Correcta!")

              }
        })
      }
    )
  }


}