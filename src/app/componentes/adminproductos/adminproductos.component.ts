import { Component } from '@angular/core';

@Component({
  selector: 'app-adminproductos',
  templateUrl: './adminproductos.component.html',
  styleUrl: './adminproductos.component.css'
})
export class AdminproductosComponent {
  ProductToSearch: any

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
        document.getElementById('new-file-input')?.setAttribute('data-content', fileName)
        document.getElementById('img-pre-tl')?.setAttribute('src', img.src)
      }
    }
    lector.readAsDataURL(archivo)
  }
}




}
