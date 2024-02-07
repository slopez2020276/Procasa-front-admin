import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarimgsUbicacion'
})
export class MostrarimgsUbicacionPipe implements PipeTransform {

  transform(items: any[], tipoTienda: string): any[] {
    if (!items || !tipoTienda) {
      return items;
    }

    return items.filter(item => item.tipoTienda.toLowerCase().includes(tipoTienda.toLowerCase()));
  }

}
