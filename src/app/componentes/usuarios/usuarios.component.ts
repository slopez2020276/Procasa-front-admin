import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

userService = inject(UsersService)

dataUsers


formularioAgregarUser:FormGroup

constructor(){
  this.formularioAgregarUser = new FormGroup({
    nombre: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  })
}

modalAddUser() { document.getElementById('cont-modal-add')?.classList.toggle('open-add') }

async ngOnInit(){
  this.ObtenerUsers()
}

async ObtenerUsers(){
const res = await this.userService.obtener()
  this.dataUsers= res.usuario 

}

async registrarUsuario(){
  
  const res = await this.userService.registrarUser(this.formularioAgregarUser.value)
  console.log(res)
  this.ObtenerUsers()
  this.formularioAgregarUser.reset()
}

}