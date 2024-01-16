import { Component, OnInit, inject } from '@angular/core';
import { HistoriaService } from '../../services/historia.service';
import { DomSanitizer } from '@angular/platform-browser';


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

  constructor(
    private _sanitizer: DomSanitizer
){}






    async ngOnInit()  {
       const response = await this.historiaService.obtenerHistoria()
       this.data = response.historia[0]
      this.enlace = this.data.EncalceVideo
      this.descricion = response.historia[0].DescripcionHistoria

       const respuesta = await this.historiaServicevideo.obtenerHistoria()
       console.log()
       this.enlaceVideo = respuesta.historia[0].EncalceVideo
       console.log(this.enlaceVideo)

    }

    getVideoIframe(url:any) {
      // let dataVIdeo = this.urlvideo
      // var video, results
      // if (url === null) { return ''; }
      // results = url.match('[\\?&]v=([^&#]*)');
      // video   = (results === null) ? url : results[1];
      // return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
      // console.log("COMPONENTE DE VIDEO");

    }
}
