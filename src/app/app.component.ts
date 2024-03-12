import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  width:any
  screens:any
ngOnInit(){
  this.width = window.innerWidth
if(this.width >= 1024){ this.screens = "desktop" }
else if(this.width < 1024 && this.width >= 768){ this.screens = "tablet" }
else if(this.width < 768){ this.screens = "movil" }

console.log(this.screens)


}



}
