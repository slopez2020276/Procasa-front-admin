import { Component } from '@angular/core';

@Component({
  selector: 'app-flecha',
  templateUrl: './flecha.component.html',
  styleUrl: './flecha.component.css'
})
export class FlechaComponent {
  toHome(){
    document.getElementById("body")?.scrollIntoView({behavior:"smooth"});
  }
}
