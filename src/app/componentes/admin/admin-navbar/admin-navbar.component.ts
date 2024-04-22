import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent  implements OnInit{


  router = inject(Router)
  UsersService = inject(UsersService)
  identidad 
  
MenuShow(){
    document.getElementById('container-menu')?.classList.toggle('openmenu')

    const bars = document.getElementsByClassName('bar')

    for(let e = 0; e<bars.length; e++){
      bars[e].classList.toggle('fx')
      setTimeout(function(){ bars[e].classList.toggle('fx') }, 300);
    }
  }

CloseSession(){
let response = confirm('¿Desea cerrar sesión?')
  if(response===true){
    localStorage.removeItem('token')
    this.router.navigate(['/admin'])
  }
}

ngOnInit(){
  this.getIdenteidad()

}    

getIdenteidad(){
  let getIdenteidad = this.UsersService.getIdentidad()
  this.identidad = getIdenteidad.rol
  console.log(this.identidad)
}

}