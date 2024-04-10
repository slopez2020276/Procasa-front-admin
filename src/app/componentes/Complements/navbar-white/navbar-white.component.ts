import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-white',
  templateUrl: './navbar-white.component.html',
  styleUrl: './navbar-white.component.css'
})
export class NavbarWhiteComponent {

ToScrollView(id:string){ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); }



MenuToggle(){
    document.getElementById('cont-menu')?.classList.toggle('activate');
    document.getElementById('cont-menu-list')?.classList.toggle('activate');
  }

}
