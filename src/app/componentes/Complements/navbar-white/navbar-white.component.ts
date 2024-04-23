import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-white',
  templateUrl: './navbar-white.component.html',
  styleUrl: './navbar-white.component.css'
})
export class NavbarWhiteComponent {
  menu:HTMLElement | any
  menuList:HTMLElement | any
ToScrollView(id:string){ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); }


MenuToggle(){
  this.menu?.classList.toggle('activate')
  this.menuList?.classList.toggle('activate')
  }

ngOnInit(){
  this.menu = document.getElementById('cont-menu')
  this.menuList = document.getElementById('cont-menu-list')
}


}
