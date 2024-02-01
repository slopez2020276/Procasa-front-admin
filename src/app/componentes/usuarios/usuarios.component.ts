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

Alias
email
id

AliasFiltro


formularioAgregarUser:FormGroup
formularioEditarUser:FormGroup

constructor(){
  this.formularioAgregarUser = new FormGroup({
    nombre: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  })

  this.formularioEditarUser = new FormGroup({
    nombre: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    })
}

modalAddUser() { document.getElementById('cont-modal-add')?.classList.toggle('open-add') }
modalEditUser() {


   document.getElementById('cont-modal-edit')?.classList.toggle('open-add') 

  }

async ObtenerxID(id){

  const respuesta = await this.userService.obtenerxId(id)

  console.log(respuesta)


  this.Alias = respuesta.User.nombre
  this.email  = respuesta.User.email
  this.id = respuesta.User._id




}


async ngOnInit(){ this.ObtenerUsers() }

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

async editarUusario(){

  const respuesta = await this.userService.editarUser(this.formularioEditarUser.value,this.id)
  console.log(respuesta)
  this.ObtenerUsers()
}

}
