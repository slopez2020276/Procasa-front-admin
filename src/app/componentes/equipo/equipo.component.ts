import { Component } from '@angular/core';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent {
  inputEmpty:string = "Seleccionar archivo"

  FileEdit(event: Event): void  {

    const fileInput = event.target as HTMLInputElement
    const archivo = fileInput.files?.[0]
  
    if (archivo) { const lector = new FileReader()
  
      lector.onload = (eventoLectura:any) => {
        const imagen = new Image()
        imagen.src = eventoLectura.target.result as string
  
        imagen.onload = () => {
          const fileSize: number = archivo.size
          const size: any = fileSize.toFixed(2)
          let medida: string
          let sizemedida: any
          if((size/1024/1024) < 1.0) {medida = " KB"; sizemedida = (size/1024).toFixed(2).toString() + medida }else{ medida = " MB"; sizemedida = (size/1024/1024).toFixed(2).toString() + medida }
          const fileName: string = archivo.name
          let img = new Image()
          const objectURL = URL.createObjectURL(archivo)
          img.src = objectURL
  
  const saveButtonTL = document.getElementById('save-new-tili')
  if (saveButtonTL) {
    saveButtonTL.addEventListener('click', () => {
  
  }, false) }
  
          document.getElementsByClassName('innerdetails')[2]!.innerHTML = sizemedida
          document.getElementsByClassName('innerdetails')[0]!.innerHTML = imagen.width + " px"
          document.getElementsByClassName('innerdetails')[1]!.innerHTML = imagen.height + " px"
          // document.getElementById('new-file-input')?.setAttribute('data-content', fileName)
          this.inputEmpty = fileName
          document.getElementById('img-pre-tl')?.setAttribute('src', img.src)
        }
      }
      lector.readAsDataURL(archivo)
    }
  }
  


DeletePlaza(){
  const innerMessage = document.getElementsByClassName('innermsg')[0]
  if (innerMessage) { innerMessage.innerHTML = "¿Desea eliminar el evento seleccionado?"

  document.getElementsByClassName('container-alert')[0]?.classList.add('show')
  document.getElementsByClassName('message')[0]?.classList.add('show')
  document.getElementsByClassName('cont-btns-alert')[0]?.classList.add('show')

  document.getElementsByClassName('cancel')[0]?.addEventListener('click', function(){
    document.getElementsByClassName('container-alert')[0]?.classList.remove('show')
    document.getElementsByClassName('message')[0]?.classList.remove('show')
    document.getElementsByClassName('cont-btns-alert')[0]?.classList.remove('show')
  },false)

  document.getElementsByClassName('confirm')[0]?.addEventListener('click', async () => {
    document.getElementsByClassName('cont-btns-alert')[0]?.classList.remove('show')
    // const respuestaDelete = await this.lineaService.eliminarLineaTIempo(id)
    document.getElementsByClassName('cont-btns-alert')[0]?.classList.remove('show'); this.MessageSuccess('Plaza eliminada',0) }, false) }
}






MessageSuccess(text: string, i: number){
    const innermsg = document.getElementsByClassName('innermsg')[i]
    if (innermsg) { innermsg.innerHTML = text
      document.getElementsByClassName('container-alert')[i]?.classList.add('show')
      document.getElementsByClassName('message')[i]?.classList.add('show')
      document.getElementsByClassName('timesuccess')[i]?.classList.toggle('lesswidth')
      document.getElementsByClassName('cont-btns-alert')[i]?.classList.add('show')
      
setTimeout(function(){
  document.getElementsByClassName('message')[i]?.classList.remove('show')
  document.getElementsByClassName('cont-btns-alert')[i]?.classList.remove('show')
  document.getElementsByClassName('container-alert')[i]?.classList.remove('show')
  document.getElementsByClassName('timesuccess')[i]?.classList.remove('lesswidth')
},2000)
}
}
}
