import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  tohistoria(){
    document.getElementById("historia")?.scrollIntoView({behavior:"smooth"});
  }
  toVision(){
    document.getElementById("mision")?.scrollIntoView({behavior:"smooth"});
  }
  toNoticia(){
    document.getElementById("noticias")?.scrollIntoView({behavior:"smooth"});
  }

  toHome(){
    document.getElementById("body")?.scrollIntoView({behavior:"smooth"});
  }

  MenuToggle(){
    document.getElementById('cont-menu')?.classList.toggle('activate');
    document.getElementById('cont-menu-list')?.classList.toggle('activate');
  }

}
