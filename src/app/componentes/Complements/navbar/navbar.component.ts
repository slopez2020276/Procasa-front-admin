import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

ToScrollView(id:string){ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); }



MenuToggle(){
    document.getElementById('cont-menu')?.classList.toggle('activate');
    document.getElementById('cont-menu-list')?.classList.toggle('activate');
  }
  
  ngOnInit() {
    const navbar:HTMLElement | any = document.querySelector('#navbar')
    window.addEventListener('scroll', () => { if (window.scrollY > 50) { navbar.classList.add('scroll') } else { navbar.classList.remove('scroll') } })
}

}
