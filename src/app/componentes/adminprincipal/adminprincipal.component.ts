import { Component, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../services/historia.service';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { LineaTiempoService } from '../../services/linea-tiempo.service';
import { timeInterval } from 'rxjs';
import { MisionService } from '../../services/mision.service';
import { NoticasService } from '../../services/noticas.service';
import { ValoresService } from '../../services/valores.service';

@Component({
  selector: 'app-adminprincipal',
  templateUrl: './adminprincipal.component.html',
  styleUrl: './adminprincipal.component.css'
})
export class AdminprincipalComponent implements OnInit {


  formulario: FormGroup
  formularioEditlineaTiempo: FormGroup
  formularioMisionValor: FormGroup
  formularioAgregarLineaTiempo:FormGroup
  formularioValores:FormGroup
  formularioEditarNoticias: FormGroup
  formularioAgregarNoticias: FormGroup





  dataValores

  ValoresService = inject(ValoresService)
  historiaService = inject(HistoriaService)
  lineaService = inject(LineaTiempoService)
  misionService = inject(MisionService)
  noticiasService = inject(NoticasService)
  



  mision:any
  vision:any
  data: any
  dataNoticias:any


  Integridad:any
  Pasion:any
  Innovacion:any
  Orientacion:any


  _idhistoria: any
  textoHistoria:any

  dataMisionÑ:any
  dataLinea:any
  dataLieneaxId:any
  dataNoticiasxID:any

  tituloModal: string = ''
  descripcionModal: string = ''
  dataLineaRespuesta: any

  



  constructor(){

    this.formulario = new FormGroup({
      DescripcionHistoria: new FormControl('ingrese la historia por favor ')
    })

    this.formularioEditlineaTiempo = new FormGroup({
      titleLineaTiempo: new FormControl(),
      descriptionLineaTiempo: new FormControl()
    })
    this.formularioMisionValor = new FormGroup({
      textMision: new FormControl(),
      textVIsion: new FormControl()
    })
   this.formularioAgregarLineaTiempo = new FormGroup({
    titleLineaTiempo: new FormControl(),
    descriptionLineaTiempo: new FormControl(),

    })
    this.formularioValores = new FormGroup({
      Integridad: new FormControl(),
      Pasion: new FormControl(),
      Innovacion: new FormControl(),
      Orientacion: new FormControl(),

      })
    this.formularioEditarNoticias = new FormGroup({
        titulo: new FormControl(),
        imgPhat: new FormControl(),
        descripcion: new FormControl(),
        })
    this.formularioAgregarNoticias= new FormGroup({
     titulo: new FormControl(),
     imgPhat: new FormControl(),
     descripcion: new FormControl(),
     })


  }


  // ENLACE DE VIDEO DE YOUTUBE DE HISTORIA

  IframeVideo() {
    const src: any = (document.getElementById('iframe-value') as HTMLInputElement | null)?.value;
          document.getElementById('iframe-preview')?.removeAttribute('src')
          document.getElementById('iframe-preview')?.setAttribute('src', src)
          // console.log(document.getElementById('iframe-preview'))
  }



// SISTEMA DE ALERTAS TYPO COLORES
  MessageAlert(message: string, type: number, time: number){
    document.getElementById('container-alert')?.classList.add('show')
    const innerMessage = document.getElementById('inner-message')
    if (innerMessage) {
      innerMessage.innerHTML = message;

      if(type===1){
        document.getElementById('time')?.classList.add('green')
      }else if(type===2){
        document.getElementById('time')?.classList.add('red')
      }else if(type===3){
        document.getElementById('time')?.classList.add('orange')
      }
      setTimeout(function(){
        document.getElementById('container-alert')?.classList.remove('show')
        document.getElementById('time')?.classList.remove('green')
        document.getElementById('time')?.classList.remove('red')
        document.getElementById('time')?.classList.remove('orange')
    },time)
    }
  }


  // SISTEMA DE ALERTAS TIPO CONFIRMACIÓN CON BOTONES
  AlertConfirm(message: string): number | any {
  document.getElementById('cont-btns-alert')?.classList.remove('show')
  document.getElementById('container-alert')?.classList.add('show')
  const innerMessage = document.getElementById('inner-message')
  if (innerMessage) {
    innerMessage.innerHTML = message;

    document.getElementById('container-alert')?.classList.add('show')
    document.getElementById('time')?.classList.remove('green')
    document.getElementById('time')?.classList.remove('red')
    document.getElementById('time')?.classList.remove('orange')
    document.getElementById('cont-btns-alert')?.classList.add('show')

    document.getElementById('cancel')?.addEventListener('click', function(){
        document.getElementById('container-alert')?.classList.remove('show')
        return 0;
      },false)

      document.getElementById('confirm')?.addEventListener('click', function(){
        document.getElementById('container-alert')?.classList.remove('show')
        return 1;
      },false)
  }

}


// AL INICIAR
  async ngOnInit()  {

    this.MessageAlert("¡Bienvenido al Administrador de Procasa!",1,2000)

    document.getElementById('mision-txt')?.setAttribute('disabled', 'disabled')
    document.getElementById('vision-txt')?.setAttribute('disabled', 'disabled')

    document.getElementById('deshabilitar')?.classList.add('hide')
    document.getElementById('deshabilitar-mv')?.classList.add('hide')
    document.getElementById('vdeshabilitar')?.classList.add('hide')

    const valoresa = document.getElementsByClassName('valores-txt')
    for(let e = 0; e < valoresa.length; e++){
      valoresa[e].setAttribute('disabled', 'disabled')
    }

    this.obtenerHistoria()
    this.obtenerLinea()
    this.obtenerMision()
    this.obtnerNoticias()
    this.obtnerValores()

  }

  async obtenerMision(){
    const respuesta = await this.misionService.obtenerMsion()
    this.dataMisionÑ = respuesta.Mision[0]
    this.mision = this.dataMisionÑ.textMision
    this.vision = this.dataMisionÑ.textVIsion

    console.log(this.dataMisionÑ)
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


// SISTEMA DEL INPUT FILE IMAGEN
  InputFile() {

    let inputfile: any = (document.getElementById('file-portada') as HTMLInputElement | null)?.value;

        document.getElementById('file-portada')?.setAttribute('data-content', inputfile)
        document.getElementById('preview-portada')?.removeAttribute('src')
        document.getElementById('preview-portada')?.setAttribute('src', "../../../assets/img/"+inputfile.slice(12))
      }

      DeleteImg(){
        document.getElementById('file-portada')?.setAttribute('data-content', "seleccionar archivo")
  document.getElementById('preview-portada')?.setAttribute('src', "../../../assets/img/empty.jpg")
}

// HABILITAR Y DESHABILITAR TEXTARES DE VISION Y MISIÓN
EnableMisionVision(){
  document.getElementById('mision-txt')?.removeAttribute('disabled')
  document.getElementById('vision-txt')?.removeAttribute('disabled')

  document.getElementById('habilitar-mv')?.classList.toggle('hide')
  document.getElementById('deshabilitar-mv')?.classList.toggle('hide')
}

DisableMisionVision(){
  document.getElementById('mision-txt')?.setAttribute('disabled', 'disabled')
  document.getElementById('vision-txt')?.setAttribute('disabled', 'disabled')

  document.getElementById('habilitar-mv')?.classList.toggle('hide')
  document.getElementById('deshabilitar-mv')?.classList.toggle('hide')
}








// SISTEMA DE HABILITAR Y DESHABILITAR TEXTAREA DE VALORES
EnableValores() {
  const valores = document.getElementsByClassName('valores-txt')
for(let e = 0; e < valores.length; e++){
  valores[e].removeAttribute('disabled')
}

  document.getElementById('vhabilitar')?.classList.toggle('hide')
  document.getElementById('vdeshabilitar')?.classList.toggle('hide')
}


DisableValores(){
  const valores = document.getElementsByClassName('valores-txt')
for(let e = 0; e < valores.length; e++){
  valores[e].setAttribute('disabled', 'disabled')
}

  document.getElementById('vhabilitar')?.classList.toggle('hide')
  document.getElementById('vdeshabilitar')?.classList.toggle('hide')
}




// MODAL LINEA DE TIEMPO
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

let confirma = this.AlertConfirm("¿Desea guardar los cambios?")
if(confirma===1){
  const response = await this.historiaService.editarHistoria(this.formulario.value,this._idhistoria)
  return true;
}
return false;
  }

  async guardarMision(){
    let id = this.dataMisionÑ._id
    const repuestaEdit =  await this.misionService.editarMisionValor(id,this.formularioMisionValor.value)
    console.log(repuestaEdit)
  }



  ModalAddTimeLine() {
    document.getElementById('modal-time-line-add')?.classList.toggle('modal')

  }

  async agregarEventoLineaTiempo(){
    const respuestaAgregar = await this.lineaService.crearEventoLineaTiempo(this.formularioAgregarLineaTiempo.value)
    this.obtenerLinea()
  }

  async obtnerNoticias (){
    const respuestasobtnerNoticas = await this.noticiasService.obtenerNoticas()
    this.dataLineaRespuesta = respuestasobtnerNoticas.noticas
    console.log(respuestasobtnerNoticas)

  }

  ModalEditNotice() { document.getElementById('modal-edit-notice')?.classList.toggle('show') }
  NewModalNotice() { document.getElementById('modal-new-notice')?.classList.toggle('show') }



  async obtnerValores(){
    const respuesta = await this.ValoresService.obtenerValores()
    this.dataValores = respuesta.valores[0]
    this.Innovacion = this.dataValores.Innovacion
    this.Pasion = this.dataValores.Pasion
    this.Integridad = this.dataValores.Integridad
    this.Orientacion = this.dataValores.Orientacion
    console.log(this.dataValores)

  }

  async editarValores(){
   let id =  this.dataValores
   const respuestaEdit = await this.ValoresService.editarValores(id,this.formularioValores.value)
   console.log(respuestaEdit)
  }


  async obtenerxidNoticias(id:any){
    const respuestaObtnerid = await this.noticiasService.obtenerxID(id)
    this.dataNoticiasxID = respuestaObtnerid
    console.log(this.dataNoticiasxID)
  
  }
   




}
