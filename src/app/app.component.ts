import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  width:any
  height:any

ngOnInit(){
  this.width = window.innerWidth
  this.height = window.innerHeight
}


}
