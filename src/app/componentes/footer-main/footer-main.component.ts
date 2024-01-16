import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SubsService } from '../../services/subs.service';

@Component({
  selector: 'app-footer-main',
  templateUrl: './footer-main.component.html',
  styleUrl: './footer-main.component.css'
})


export class FooterMainComponent {

  formularioAgregarSub : FormGroup
  SubService = inject(SubsService)



  SendForm(){
    console.log("CLICKED SUBMIT FORM");
}

constructor(){

  this.formularioAgregarSub = new FormGroup({
    correo: new FormControl('ingrese la historia por favor '),
    nombre: new FormControl('ingrese la historia por favor '),
    apellido: new FormControl('ingrese la historia por favor ')

  })


      const footer = document.getElementById('foot');
      let scrollywindow:number = 0;
      window.addEventListener('scroll',function(){
console.log("...............................................................................");
              scrollywindow=this.scrollY;

            if(scrollywindow>=1){
              console.log(scrollywindow)
              document.getElementById('foot')?.classList.add('tobottom') }else{ document.getElementById('foot')?.classList.remove('tobottom') }
      }, false)
}

OpenForm(){ document.getElementById('formulario')?.classList.toggle('open'); }
CloseForm(){ document.getElementById('formulario')?.classList.toggle('open'); }

 async agregarnuevaSub(){
  const respuetsaNUevaSub = await this.SubService.crearSub(this.formularioAgregarSub.value)
  console.log(respuetsaNUevaSub)

  console.log('hola')
}


}
