import { Component } from '@angular/core'

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent {
  subCount: number = 0
  subsArray: number[] = []

  inputEmpty:string = "Seleccionar archivo"

  ModalProduct(type:string){
    document.getElementById(type)?.classList.toggle('show')
    document.getElementById('cont-modal-inputs')?.classList.remove('show')
   }

   FileEdit(event: Event): void {

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
            console.log(archivo)
            this.inputEmpty = archivo.name

        document.getElementById('width-new-n')?.classList.remove('limit')
            document.getElementById('height-new-n')?.classList.remove('limit')
            document.getElementById('size-new-n')?.classList.remove('limit')

            if(1000 > 2000){  document.getElementById('width-new-n')?.classList.add('limit') }
            if(1000 > 1500){ document.getElementById('height-new-n')?.classList.add('limit') }
            if((size/1024) > 2048 ){  document.getElementById('size-new-n')?.classList.add('limit') }

            document.getElementById('size-new-n')!.innerHTML = sizemedida
            document.getElementById('width-new-n')!.innerHTML = " px"
            document.getElementById('height-new-n')!.innerHTML = " px"
            // document.getElementById('preview-plaza')?.removeAttribute('src')
            document.getElementById('preview-plaza')?.setAttribute('src', img.src)

            const saveButtonTL = document.getElementById('presave-noticia')
            if (saveButtonTL) { saveButtonTL.addEventListener('click', () => {

              const tituloInput: HTMLInputElement | null = document.getElementById('titulo-noticia') as HTMLInputElement | null
              const descripcionInput: HTMLTextAreaElement | any = document.getElementById('desc-noticia')

              let titulo: string = ''
              let descripcion: string = ''

              if (tituloInput instanceof HTMLInputElement) { titulo = tituloInput.value }
              if (descripcionInput instanceof HTMLTextAreaElement) { descripcion = descripcionInput.value }

    if(titulo!=="" && descripcion!==""){
      const innerMessage = document.getElementsByClassName('innermsg')[9]
      if (innerMessage) { innerMessage.innerHTML = "¿Desea guardar los cambios?"


              document.getElementsByClassName('container-alert')[9]?.classList.add('show')
              document.getElementsByClassName('message')[9]?.classList.add('show')
              document.getElementsByClassName('cont-btns-alert')[9]?.classList.add('show')

                document.getElementsByClassName('cancel')[9]?.addEventListener('click', function(){
                document.getElementsByClassName('container-alert')[9]?.classList.remove('show')
                document.getElementsByClassName('message')[9]?.classList.remove('show')
                document.getElementsByClassName('cont-btns-alert')[9]?.classList.remove('show')
              },false)
              document.getElementsByClassName('confirm')[9]?.addEventListener('click', function(){
                document.getElementsByClassName('container-alert')[9]?.classList.remove('show')

              },false)
            }

          }else{
            document.getElementsByClassName('cont-btns-alert')[9]?.classList.remove('show')
            this.MessageSuccess("Los campos requeridos no pueden estar vacíos",9)
          }
            }, false) }
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



generarSub() { const newSubIndex = this.subsArray.length + 1; this.subsArray.push(newSubIndex) }
eliminarUltimoSub() { if (this.subsArray.length > 0) { this.subsArray.pop() } }

SaveFunctions(){ document.getElementById('cont-modal-inputs')?.classList.toggle('show') }

}
