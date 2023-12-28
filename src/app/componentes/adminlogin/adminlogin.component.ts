import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {

  formulario: FormGroup 
  data:string= 'aa'

  usersService = inject(UsersService)


  constructor(){
    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      obtenerToken: new FormControl('true')

    })

  }

  async onSubmit(){
    const response = await this.usersService.login(this.formulario.value)
    console.log(response.token)
    this.data = response.token

  }
  

}
