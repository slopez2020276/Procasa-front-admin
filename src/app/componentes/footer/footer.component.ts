import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { SubsService } from '../../services/subs.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  formularioAgregarSub : FormGroup

  SubService = inject(SubsService)

  constructor(){
    this.formularioAgregarSub = new FormGroup({
      correo: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl()
  
    })
  }

  OpenForm(){ document.getElementById('formulario')?.classList.toggle('open'); }
  CloseForm(){ document.getElementById('formulario')?.classList.toggle('open'); }


  async agregarnuevaSub(){
    const respuetsaNUevaSub = await this.SubService.crearSub(this.formularioAgregarSub.value)
    console.log(respuetsaNUevaSub)
  
    console.log('hola')
  }
  

}
