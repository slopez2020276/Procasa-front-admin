import { Component, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../services/historia.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrl: './historia.component.css'
})
export class HistoriaComponent implements OnInit {

  data
  enlace :string = ''
  historiaService = inject(HistoriaService)
  descricion: string = ''

  urlvideo = ""
  historiaServicevideo = inject(HistoriaService)
  enlaceVideo:any
  match:any
  constructor(
    private _sanitizer: DomSanitizer
){}






    async ngOnInit()  {
      const response = await this.historiaService.obtenerHistoria();
    
      if (response && response.historia && response.historia.length > 0) {
        this.data = response.historia[0];
        this.enlace = this.data.EncalceVideo;
        this.descricion = response.historia[0].DescripcionHistoria;
      }
    
      const respuesta = await this.historiaServicevideo.obtenerHistoria();
    
      if (respuesta && respuesta.historia && respuesta.historia.length > 0) {
        this.enlaceVideo = respuesta.historia[0].EncalceVideo;
      }
    }

    getVideoIframe(url: string): any {
      if (!url) {
        return '';
      }
    
      const videoId = url.match(/[\\?&]v=([^&#]*)/)?.[1];
      const safeUrl = `https://www.youtube.com/embed/${videoId}`;
      return this._sanitizer.bypassSecurityTrustResourceUrl(safeUrl);
    }
    
    
}
