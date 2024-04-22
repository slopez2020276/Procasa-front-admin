import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

  router = inject(Router)
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

}