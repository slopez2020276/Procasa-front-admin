import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostraUbicacion'
})
export class MostraUbicacionPipe implements PipeTransform {

  transform(items: any[], nombreTienda: string): any[] {
    if (!items || !nombreTienda) {
      return items;
    }

    return items.filter(item => item.nombreTienda.toLowerCase().includes(nombreTienda.toLowerCase()));
  }

}
