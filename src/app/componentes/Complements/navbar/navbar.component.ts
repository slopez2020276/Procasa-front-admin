import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

menu:HTMLElement | any
menuList:HTMLElement | any

ToScrollView(id:string){ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); }



MenuToggle(){
  this.menu?.classList.toggle('activate')
  this.menuList?.classList.toggle('activate')
  }
  
ngOnInit() {
    const navbar:HTMLElement | any = document.querySelector('#navbar')
    window.addEventListener('scroll', () => { if (window.scrollY > 50) { navbar.classList.add('scroll') } else { navbar.classList.remove('scroll') } })

      this.menu = document.getElementById('cont-menu')
      this.menuList = document.getElementById('cont-menu-list')

}

}
