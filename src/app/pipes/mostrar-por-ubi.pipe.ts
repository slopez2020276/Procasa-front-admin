import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'MostrarPorUbiPipe'
})
export class MostrarPorUbiPipe implements PipeTransform {

  transform(items: any[], nombreTienda: string): any[] {
    if (!items || !nombreTienda) {
      return items;
    }

    return items.filter(item => item.nombreTienda.toLowerCase().includes(nombreTienda.toLowerCase()));
  }
}
