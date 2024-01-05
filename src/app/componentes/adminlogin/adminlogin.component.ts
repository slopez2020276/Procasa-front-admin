import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {

  formulario: FormGroup
  data:string= 'aa'

  usersService = inject(UsersService)
  router = inject(Router)

  constructor(){
    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      obtenerToken: new FormControl('true')

    })

  }



  MessageAlert(message: string, type: number, time: number){
    document.getElementById('container-alert')?.classList.add('show')
    const innerMessage = document.getElementById('inner-message');
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
      this.router.navigate(['admin/Principal'])
    }


  }


ngOnInit(){

}

}
