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
containerAlert: HTMLElement | any
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


async ngOnInit(){
   this.ObtenerUsers()
   this.containerAlert = document.getElementById('background-alert')
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

async editarUusario(){

  const respuesta = await this.userService.editarUser(this.formularioEditarUser.value,this.id)
  console.log(respuesta)
  this.ObtenerUsers()
}















/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// S Y S T E M A      D E     A L E R T A S
AlertOption(message:string) {
  const parent: HTMLElement | any = this.containerAlert
  parent?.classList.add('show')
  const alert: HTMLElement | any = parent?.childNodes[0]
  alert?.classList.add('show')
  const inner: HTMLElement | any = alert?.childNodes[0]?.childNodes[0]
  inner!.innerText = message
  const btns: HTMLElement | any = alert?.childNodes[0]?.childNodes[1]
  btns?.classList.add('show')
}

AlertMessage(message:string, time:number) {
  const parent: HTMLElement | any = this.containerAlert
  parent?.classList.add('show')
  const alert: HTMLElement | any = parent?.childNodes[0]
  alert?.classList.add('show')
  const inner: HTMLElement | any = alert?.childNodes[0]?.childNodes[0]
  inner!.innerText = message
  const btns: HTMLElement | any = alert?.childNodes[0]?.childNodes[1]
  btns?.classList.remove('show')
  setTimeout(() => { this.AlertClose() }, time)
}


AlertClose(){
  const parent: HTMLElement | any = this.containerAlert
  parent?.classList.remove('show')
  const alert: HTMLElement | any = parent?.childNodes[0]
  alert?.classList.remove('show')
  const inner: HTMLElement | any = alert?.childNodes[0]?.childNodes[0]
  inner!.innerText = ""
  const btns: HTMLElement | any = alert?.childNodes[0]?.childNodes[1]
  btns?.classList.remove('show')
}

// P L A N T I L L A      D E      S Y S T E M     A L E R T 
SystemAlert(id: number) {
  this.AlertOption("Message to Show")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) { 
    btn.onclick = () => {
          // A C T I O N 
    }
  }
}
















}
