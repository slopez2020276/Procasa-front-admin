import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-main',
  templateUrl: './footer-main.component.html',
  styleUrl: './footer-main.component.css'
})
export class FooterMainComponent {


constructor(){
      const footer = document.getElementById('foot');
      let scrollywindow:number = 0;
      window.addEventListener('scroll',function(){
              scrollywindow=this.scrollY;
            if(scrollywindow>=1){
              document.getElementById('foot')?.classList.add('tobottom');
            }else{
              document.getElementById('foot')?.classList.remove('tobottom');
              }
      },false);

}

OpenForm(){
  document.getElementById('formulario')?.classList.toggle('open');
  // const transparent = document.getElementById('transparence');
  document.getElementById('transparence')?.classList.add('open');
  document.getElementById('transparence')?.addEventListener('click',function(){
      document.getElementById('formulario')?.classList.remove('open');
      document.getElementById('transparence')?.classList.remove('open');
  },false);
}



}
