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
    document.getElementById("valores")?.scrollIntoView({behavior:"smooth"});
  }
  toNoticia(){
    document.getElementById("news")?.scrollIntoView({behavior:"smooth"});
  }

  MenuToggle(){
    document.getElementById('cont-menu')?.classList.toggle('activate');
    document.getElementById('cont-menu-list')?.classList.toggle('activate');
  }

}
