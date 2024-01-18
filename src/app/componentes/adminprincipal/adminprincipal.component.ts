import { Component, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../services/historia.service';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { LineaTiempoService } from '../../services/linea-tiempo.service';
import { timeInterval } from 'rxjs';
import { MisionService } from '../../services/mision.service';
import { NoticasService } from '../../services/noticas.service';
import { ValoresService } from '../../services/valores.service';


interface HtmlInputEvent extends Event {
  target: HTMLInputElement;
}
@Component({
  selector: 'app-adminprincipal',
  templateUrl: './adminprincipal.component.html',
  styleUrl: './adminprincipal.component.css'
})
export class AdminprincipalComponent implements OnInit {


  desgloce: any
  formulario: FormGroup
  formularioEditHistoria: FormGroup
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


  Integridadmodel:any
  PasionModel:any
  InnovacionModel:any
  OrientacionModel:any


  _idhistoria: any
  textoHistoria:any
  EncalceVideo: any

  dataMisionÑ:any
  dataLinea:any
  dataLieneaxId:any
  dataNoticiasxID:any

  tituloModal: string = ''
  descripcionModal: string = ''
  dataLineaRespuesta: any

  tituloNoticia:string = ''
  descripcionNoticia:string = ''

  photoSelected: string | ArrayBuffer | null = null;
file: File | undefined;
private fileTmp:any;
private fileTmpNoticia :any;




  constructor(){


    this.formulario = new FormGroup({
      DescripcionHistoria: new FormControl(),
      EncalceVideo: new FormControl()
    })

    this.formularioEditlineaTiempo = new FormGroup({
      titleLineaTiempo: new FormControl(),
      descriptionLineaTiempo: new FormControl()
    })
    this.formularioEditHistoria = new FormGroup({
      titleHistoria: new FormControl(),
      descriptionHistoria: new FormControl()
    })
    this.formularioMisionValor = new FormGroup({
      textMision: new FormControl(),
      textVIsion: new FormControl()
    })
   this.formularioAgregarLineaTiempo = new FormGroup({
    titleLineaTiempo: new FormControl(),
    descriptionLineaTiempo: new FormControl(),
    image: new FormControl()

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
  AlertConfirm(message: string, elem: string): number | any {
  document.getElementById('cont-btns-alert-'+elem)?.classList.remove('show')
  document.getElementById('container-alert-'+elem)?.classList.add('show')
  const innerMessage = document.getElementById('inner-message-'+elem)
  if (innerMessage) {
    innerMessage.innerHTML = message;

    document.getElementById('container-alert-'+elem)?.classList.add('show')
    document.getElementById('cont-btns-alert-'+elem)?.classList.add('show')

    document.getElementById('cancel-'+elem)?.addEventListener('click', function(){
        document.getElementById('container-alert-'+elem)?.classList.remove('show')
      },false)

      document.getElementById('confirm-'+elem)?.addEventListener('click', function(){
        setTimeout(() => { document.getElementById('container-alert-'+elem)?.classList.remove('show') },500)
      },false)
  }


}





// AL INICIAR
  async ngOnInit()  {


    // document.getElementById('container-alert')?.classList.remove('show')
      const inputfileBefore: any = (document.getElementById('file-portada') as HTMLInputElement | null)?.value;

if(inputfileBefore==""){  document.getElementById('preview-portada')?.setAttribute('src', "../../../assets/img/empty.jpg");  document.getElementById('file-portada')?.setAttribute('data-content', 'seleccionar archivo')}


    document.getElementById('deshabilitar')?.classList.add('hide')
    document.getElementById('deshabilitar-mv')?.classList.add('hide')
    document.getElementById('vdeshabilitar')?.classList.add('hide')
    document.getElementById('deshabilitar-hs')?.classList.add('hide')

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


    document.getElementById('mision-txt')?.setAttribute('disabled', 'true')
    document.getElementById('vision-txt')?.setAttribute('disabled', 'true')
  }

  async obtenerHistoria(){
    const responsivehistoria = await this.historiaService.obtenerHistoria()
    this.data = responsivehistoria.historia[0]
    this.textoHistoria = responsivehistoria.historia[0].DescripcionHistoria
    this.EncalceVideo = responsivehistoria.historia[0].EncalceVideo
    this._idhistoria = responsivehistoria.historia[0]._id

    document.getElementById('iframe-value')?.setAttribute('disabled', 'true')
    document.getElementById('textareaValidate')?.setAttribute('disabled', 'true')
  }

  async obtenerLinea(){
    const repuestaLinea = await this.lineaService.obtenerLineaTiempo()
    this.dataLinea = repuestaLinea.lineFiended
  }


// SISTEMA DEL INPUT FILE IMAGEN
  InputFile() {

    const inputfile: any = (document.getElementById('file-portada') as HTMLInputElement | null)?.value

    let img = new Image()
    img.src = inputfile
    console.log("- - - - - DETALLES DEL ARCHIVO IMG - - - - -")
    console.log(img)
    console.log(img.naturalWidth)
    console.log(img.naturalWidth)

// document

        document.getElementById('file-portada')?.setAttribute('data-content', inputfile)
        document.getElementById('preview-portada')?.removeAttribute('src')
        document.getElementById('preview-portada')?.setAttribute('src', "../../../assets/img/"+inputfile.slice(12))
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

EnableHistoria(){
  document.getElementById('iframe-value')?.removeAttribute('disabled')
  document.getElementById('textareaValidate')?.removeAttribute('disabled')

  document.getElementById('habilitar-hs')?.classList.toggle('hide')
  document.getElementById('deshabilitar-hs')?.classList.toggle('hide')
}

DisableHistoria(){
  document.getElementById('iframe-value')?.setAttribute('disabled', 'disabled')
  document.getElementById('textareaValidate')?.setAttribute('disabled', 'disabled')

  document.getElementById('habilitar-hs')?.classList.toggle('hide')
  document.getElementById('deshabilitar-hs')?.classList.toggle('hide')
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
 const guardarRes = await this.lineaService.editarLineaforID(id,this.formularioEditHistoria.value)
 this.obtenerHistoria()
 this.Modal()

}

async editarHistoriaA(){
  // let id =  this.dataLieneaxId._id
//  const guardarRes = await this.lineaService.editarLineaforID(id,this.formularioEditlineaTiempo.value)
 this.obtenerLinea()
 this.Modal()
}




ModalTimeLine() {document.getElementById('modal-time-line')?.classList.toggle('modal') }



 async onSubmit(){}

  async guardarMision(){
    let id = this.dataMisionÑ._id
    const repuestaEdit =  await this.misionService.editarMisionValor(id,this.formularioMisionValor.value)
    console.log(repuestaEdit)
  }


  textareaValue(valor){ valor }

  async editarHistoria(){

    const enlaceValidate: any = (document.getElementById('iframe-value') as HTMLInputElement | null)?.value
    // const txtareaValidate: any = (document.getElementById('textareaValidate') as HTMLInputElement | null)?.value
    const txtareaValidate: any = this.desgloce

      if(enlaceValidate==undefined || txtareaValidate=="" || (enlaceValidate==undefined && txtareaValidate=="")){
        this.MessageSuccess('Los campos requeridos no pueden estar vacíos','a')
      }else{

        let id = this._idhistoria
        const respuestaAgregar = await this.historiaService.editarHistoria(this.formulario.value,id)
        this.obtenerHistoria()
        this.MessageSuccess('¡Datos guardados exitosamente!','a')
      }
  }



  ModalAddTimeLine() {
    document.getElementById('modal-time-line-add')?.classList.toggle('modal')

  }

  async agregarEventoLineaTiempo(){
    this.obtenerLinea()
    console.log(this.formularioAgregarLineaTiempo.value.image)

  }

  async obtnerNoticias (){
    const respuestasobtnerNoticas = await this.noticiasService.obtenerNoticas()
    this.dataLineaRespuesta = respuestasobtnerNoticas.noticas
    console.log(respuestasobtnerNoticas)
  }

  async obtnerHistorias (){
    let respuestasobtnerHistoria = await this.historiaService.obtenerHistoria()
    this.dataLineaRespuesta = respuestasobtnerHistoria.historia
  }

  ModalEditNotice() { document.getElementById('modal-edit-notice')?.classList.toggle('show') }
  NewModalNotice() { document.getElementById('modal-new-notice')?.classList.toggle('show') }



  async obtnerValores(){
    const respuesta = await this.ValoresService.obtenerValores()
    this.dataValores = respuesta.valores[0]
    this.Integridadmodel = this.dataValores.Innovacion
    this.PasionModel = this.dataValores.Pasion
    this.InnovacionModel = this.dataValores.Integridad
    this.OrientacionModel = this.dataValores.Orientacion
    console.log(this.dataValores)


    document.getElementById('txt-integridad')?.setAttribute('disabled', 'true')
    document.getElementById('txt-pasion')?.setAttribute('disabled', 'true')
    document.getElementById('txt-innovacion')?.setAttribute('disabled', 'true')
    document.getElementById('txt-orientacion')?.setAttribute('disabled', 'true')


    // this.MessageAlert("¡Bienvenido al Administrador de Procasa!",1,2000)
  }

  async editarValores(){
   let id =  this.dataValores._id
   const respuestaEdit = await this.ValoresService.editarValores(id,this.formularioValores.value)
   console.log(respuestaEdit)
  }




  async obtenerxidNoticias(id:any){
    const respuestaObtnerid = await this.noticiasService.obtenerxID(id)
    this.dataNoticiasxID = respuestaObtnerid.noticia
    console.log(this.dataNoticiasxID)
    this.tituloNoticia = this.dataNoticiasxID.titulo
    this.descripcionNoticia = this.dataNoticiasxID.descripcion


  }


async eliminarLineaTiempo(id){
  const respuestaDelete = await this.lineaService.eliminarLineaTIempo(id)
  console.log(respuestaDelete)
  this.obtenerLinea()
}

async eliminarNoticia(id){
  const respuestaDelete = await this.noticiasService.EliminarNoticia(id)
  console.log(respuestaDelete)
  this.obtnerNoticias()
}

  async editarNoticiasxid(){
    let id = this.dataNoticiasxID._id
    const respuestaeditNoticias = await this.noticiasService.editarnoticas(id,this.formularioEditarNoticias.value)
    console.log(respuestaeditNoticias)
    this.obtnerNoticias()
    this.ModalEditNotice()
   }

   async crearNoticia(){
    const respuestaCrearNoticia = await this.noticiasService.crearNoticia(this.formularioAgregarNoticias.value)
    console.log(respuestaCrearNoticia)
    this.obtnerNoticias()
    this.NewModalNotice()
   }



  onPhotoSelected(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.files && event.target.files[0]) {
        this.file = event.target.files[0];

        // image preview
        const reader = new FileReader();

        reader.onload = (e) => {
          // Cambia la asignación solo si reader.result no es null
          if (reader.result !== null) {
            this.photoSelected = reader.result as string | ArrayBuffer;
          }
        };

        reader.readAsDataURL(this.file);
      }
    }
  }


  getFile($event: any): void {
    //TODO esto captura el archivo!
    const [ file ] = $event.target.files;
    this.fileTmp = {
      fileRaw:file,
      fileName:file.name
    }
  }

  sendFile():void{

    const body = new FormData();
    body.append('ImgPathLineaTiempo', this.fileTmp.fileRaw, this.fileTmp.fileName);
    body.append('titleLineaTiempo', this.formularioAgregarLineaTiempo.value.titleLineaTiempo)
    body.append('descriptionLineaTiempo',this.formularioAgregarLineaTiempo.value.descriptionLineaTiempo)

    this.lineaService.sendPost(body)
    .subscribe(res => console.log(res))

    this.obtenerLinea()
  }

  getFileNoticia($event: any): void {
    //TODO esto captura el archivo!
    const [ file ] = $event.target.files;
    this.fileTmpNoticia = {
      fileRaw:file,
      fileName:file.name
    }
  }

  sendFileNoticia():void{

    const body = new FormData();
    body.append('imgPhat', this.fileTmpNoticia.fileRaw, this.fileTmpNoticia.fileName);
    body.append('titulo', this.formularioAgregarNoticias.value.titulo)
    body.append('descripcion',this.formularioAgregarNoticias.value.descripcion)

    this.noticiasService.sendPost(body)
    .subscribe(res => console.log(res))
    this.obtnerNoticias()

  }

ShowMore(){
  console.log("-- MOSTRAR MÁS --")
}



  MessageSuccess(text: string, idmsg: string){

    const innermsg = document.getElementById('innermsg-'+idmsg)
    if (innermsg) { innermsg.innerHTML = text
      document.getElementById('messagge-'+idmsg)?.classList.add('show')
      document.getElementById("timesuccess")?.classList.toggle('lesswidth')
      setTimeout(() => {
        document.getElementById('messagge-'+idmsg)?.classList.remove('show')
        document.getElementById("timesuccess")?.classList.toggle('lesswidth')
    },1500)
  }
  }

}
