import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-main',
  templateUrl: './footer-main.component.html',
  styleUrl: './footer-main.component.css'
})
export class FooterMainComponent {

  SendForm(){
    console.log("CLICKED SUBMIT FORM");
}

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

OpenForm(){ document.getElementById('formulario')?.classList.toggle('open'); }
}
