import { Component } from '@angular/core';

@Component({
  selector: 'app-flecha',
  templateUrl: './flecha.component.html',
  styleUrl: './flecha.component.css'
})
export class FlechaComponent {

  constructor(){
    let scrollywindow:number = 0;
    window.addEventListener('scroll',function(){
            scrollywindow=this.scrollY;
          if(scrollywindow>=200){
            document.getElementById('to-home-scroll')?.classList.add('toshow');
          }else{
            document.getElementById('to-home-scroll')?.classList.remove('toshow');
            }
    },false);
}


  toHome(){
    document.getElementById("body")?.scrollIntoView(true);
  }
}
