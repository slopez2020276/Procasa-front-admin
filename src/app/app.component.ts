import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  width:any
  screens:any

  constructor(private router: Router, private viewportScroller: ViewportScroller) { this.router.events.pipe( filter((event) => event instanceof NavigationEnd)).subscribe(() => { this.viewportScroller.scrollToPosition([0,0]) }) }

ngOnInit(){

  this.width = window.innerWidth
if(this.width >= 1024){ this.screens = "desktop" }
else if(this.width < 1024 && this.width >= 768){ this.screens = "tablet" }
else if(this.width < 768){ this.screens = "movil" }

console.log(this.screens)

}



}
