import { Component, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../services/historia.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LineaTiempoService } from '../../services/linea-tiempo.service';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-adminprincipal',
  templateUrl: './adminprincipal.component.html',
  styleUrl: './adminprincipal.component.css'
})
export class AdminprincipalComponent implements OnInit {


  formulario: FormGroup
  formularioEditlineaTiempo: FormGroup
  historiaService = inject(HistoriaService)
  lineaService = inject(LineaTiempoService)
  data: any
  _idhistoria: any
  textoHistoria:any
  dataLinea:any
  dataLieneaxId:any
  tituloModal: string = ''
  descripcionModal: string = ''


  constructor(){

    this.formulario = new FormGroup({
      DescripcionHistoria: new FormControl('ingrese la historia por favor ')
    })

    this.formularioEditlineaTiempo = new FormGroup({
      titleLineaTiempo: new FormControl(),
      descriptionLineaTiempo: new FormControl()
    })

  }


  IframeVideo() {
    const src: any = (document.getElementById('iframe-value') as HTMLInputElement | null)?.value;
          document.getElementById('iframe-preview')?.removeAttribute('src')
          document.getElementById('iframe-preview')?.setAttribute('src', src)
          // console.log(document.getElementById('iframe-preview'));
  }


  async ngOnInit()  {
    document.getElementById('mision-txt')?.setAttribute('disabled', 'disabled');
    document.getElementById('vision-txt')?.setAttribute('disabled', 'disabled');
    document.getElementById('deshabilitar')?.classList.add('hide');
    document.getElementById('vdeshabilitar')?.classList.add('hide');

    const valoresa = document.getElementsByClassName('valores-txt');
    for(let e = 0; e < valoresa.length; e++){
      valoresa[e].setAttribute('disabled', 'disabled');
    }

    this.obtenerHistoria()
    this.obtenerLinea()

  }

  async obtenerHistoria(){
    const responsive = await this.historiaService.obtenerHistoria()
    this.data = responsive.historia[0]
    this.textoHistoria = responsive.historia[0].DescripcionHistoria
    this._idhistoria = responsive.historia[0]._id
    console.log(this.textoHistoria)
    console.log(this.data)

  }

  async obtenerLinea(){
    const repuestaLinea = await this.lineaService.obtenerLineaTiempo()
     this.dataLinea = repuestaLinea.lineFiended
     console.log(this.dataLinea)

  }
  InputFile() {
    const inputfile: any = (document.getElementById('file-portada') as HTMLInputElement | null)?.value;
    document.getElementById('file-portada')?.setAttribute('data-content', inputfile);
    document.getElementById('preview-portada')?.removeAttribute('src');
    document.getElementById('preview-portada')?.setAttribute('src', "../../../assets/img/"+inputfile.slice(12));
    console.log(inputfile.slice(12));
}

  DeleteImg(){
  document.getElementById('preview-portada')?.removeAttribute('src');
}

EnableMisionVision(){
  document.getElementById('mision-txt')?.removeAttribute('disabled');
  document.getElementById('vision-txt')?.removeAttribute('disabled');

  document.getElementById('habilitar')?.classList.toggle('hide')
  document.getElementById('deshabilitar')?.classList.toggle('hide')
}

DisableMisionVision(){
  document.getElementById('mision-txt')?.setAttribute('disabled', 'disabled');
  document.getElementById('vision-txt')?.setAttribute('disabled', 'disabled');

  document.getElementById('habilitar')?.classList.toggle('hide')
  document.getElementById('deshabilitar')?.classList.toggle('hide')
}









EnableValores() {
  const valores = document.getElementsByClassName('valores-txt');
for(let e = 0; e < valores.length; e++){
  valores[e].removeAttribute('disabled');
}

  document.getElementById('vhabilitar')?.classList.toggle('hide')
  document.getElementById('vdeshabilitar')?.classList.toggle('hide')
}


DisableValores(){
  const valores = document.getElementsByClassName('valores-txt');
for(let e = 0; e < valores.length; e++){
  valores[e].setAttribute('disabled', 'disabled');
}

  document.getElementById('vhabilitar')?.classList.toggle('hide')
  document.getElementById('vdeshabilitar')?.classList.toggle('hide')
}



async editarModal(id:any) {
  const respuestaid = await this.lineaService.obtenerLineaxID(id)
  console.log(id)

  this.dataLieneaxId = respuestaid.lineaFiend
  this.tituloModal = this.dataLieneaxId.titleLineaTiempo
  this.descripcionModal = this.dataLieneaxId.descriptionLineaTiempo
  console.log(this.dataLieneaxId)
  console.log(this.tituloModal)

}


 Modal() {
  document.getElementById('modal-time-line')?.classList.toggle('modal')
}


async buscarporID(id:any){
  const respuestaID = await this.lineaService.obtenerLineaxID(id)
  this.dataLieneaxId = respuestaID.lineaFiend
  console.log(this.dataLieneaxId)

}

async editarTime(){
  let id =  this.dataLieneaxId._id
 const guardarRes = await this.lineaService.editarLineaforID(id,this.formularioEditlineaTiempo.value)
 console.log(guardarRes)
 this.obtenerLinea()
 this.Modal()
}


ModalTimeLine() {document.getElementById('modal-time-line')?.classList.toggle('modal') }



 async onSubmit(){
    const response = await this.historiaService.editarHistoria(this.formulario.value,this._idhistoria)
    console.log(response)
  }


}
