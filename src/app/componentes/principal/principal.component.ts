import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent {
ngOnInit(){
  let scrollywindow:any
  window.addEventListener('scroll',function(){
    scrollywindow=this.scrollY

    if(scrollywindow>550){ this.document.getElementById('historia')?.classList.add('topshow') }else{this.document.getElementById('historia')?.classList.remove('topshow')}

  },false)



}
}
