import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HistoriaService } from '../../services/historia.service';



@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrl: './youtube.component.css'
})



export class YoutubeComponent implements OnInit {
  urlvideo = "https://www.youtube.com/watch?v=akGkQ1Vm-Xk"
  historiaService = inject(HistoriaService)
  enlaceVideo:any

  constructor(
    private _sanitizer: DomSanitizer
){}
   async ngOnInit() {
    const respuesta = await this.historiaService.obtenerHistoria()
    console.log()
    this.enlaceVideo = respuesta.historia[0].EncalceVideo

    console.log(this.enlaceVideo)
  }



getVideoIframe(url:any) {

  let dataVIdeo = this.urlvideo
  var video, results

  if (url === null) {
      return '';
  }
  // results = url.match('[\\?&]v=([^&#]*)')
  video   = (results === null) ? url : results[1]


  return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
}


}
