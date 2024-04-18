import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarNombrePlaza'
})
export class MostrarNombrePlazaPipe implements PipeTransform {

  transform(items: any[], titulo: string): any[] {
    if (!items || !titulo) {
      return items;
    }

    return items.filter(item => item.titulo.toLowerCase().includes(titulo.toLowerCase()));
  }
}
