import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  

 
  
  ngAfterViewInit(){
    window.onload = function () {
      const footer = document.getElementById('footer');
      let scrollywindow:number = 0;
      window.addEventListener('scroll',function(){
              scrollywindow=this.scrollY;
            if(scrollywindow>=1){
                footer?.classList.add('fdown');
                if(scrollywindow>=300){
                  footer?.classList.add("ftofoot");
                }
              }else{
                footer?.classList.remove('fdown');
                footer?.classList.remove("ftofoot");
            }
      },false);
  
  }
  }
  
  
  
  OpenForm(){
    document.getElementById('formulario')?.classList.add('open');
    const transparent = document.getElementById('transparence');
    transparent?.classList.add('open');
    // transparent.addEventListener('click',function(){
    //     document.getElementById('formulario')?.classList.remove('open');
        // transparent.classList.remove('open');
    // },false);
  }
  
  

}
