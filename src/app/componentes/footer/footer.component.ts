import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

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
