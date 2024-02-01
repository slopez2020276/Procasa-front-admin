import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarAlias'
})
export class MostrarAliasPipe implements PipeTransform {

  transform(items: any[], nombre: string): any[] {
    if (!items || !nombre) {
      return items;
    }

    return items.filter(item => item.nombre.toLowerCase().includes(nombre.toLowerCase()));
  }

}
