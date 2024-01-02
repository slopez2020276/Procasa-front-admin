import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  OpenForm(){ document.getElementById('formulario')?.classList.toggle('open'); }
  CloseForm(){ document.getElementById('formulario')?.classList.toggle('open'); }



}
