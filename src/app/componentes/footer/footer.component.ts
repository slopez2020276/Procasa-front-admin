import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  OpenForm(){
    document.getElementById('formulario')?.classList.add('open');
    const transparent = document.getElementById('transparence');
    transparent?.classList.add('open');
    transparent?.addEventListener('click',function(){
        document.getElementById('formulario')?.classList.remove('open');
        transparent.classList.remove('open');
    },false);
  }

}
