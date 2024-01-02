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

  async onSubmit(){
    const response = await this.usersService.login(this.formulario.value)
    this.data = response.token

    this.data = response.token
    if(response.message ){
      console.log(response.message )


//error con alertas      

    }else if (response.token){
      localStorage.setItem('token', response.token)
      this.router.navigate(['admin/Principal'])
      
    }


  }
  

}
