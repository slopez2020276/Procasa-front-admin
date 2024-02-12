import { Component } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'


@Component({
  selector: 'app-adminproductos',
  templateUrl: './adminproductos.component.html',
  styleUrl: './adminproductos.component.css'
})
export class AdminproductosComponent {
  ProductToSearch: any
  subCount: number = 0
  subsArray: number[] = []
  productArray: number[] = []
  inputEmpty:string = "Seleccionar archivo"
  
ModalProduct(type:string){ document.getElementById('modal-'+type+'-product')?.classList.toggle('show') }

DeleteProduct(){
  confirm("¿eliminar?")
}


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


generarSub() { const newSubIndex = this.subsArray.length + 1; this.subsArray.push(newSubIndex) }
eliminarUltimoSub() { if (this.subsArray.length > 0) { this.subsArray.pop() } }

generarProduct() { const newProIndex = this.productArray.length + 1; this.productArray.push(newProIndex) }
eliminarUltimoProducto() { if (this.productArray.length > 0) { this.productArray.pop() } }



}
