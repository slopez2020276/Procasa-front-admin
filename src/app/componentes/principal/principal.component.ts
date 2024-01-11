import { Component, OnInit, inject } from '@angular/core';
import { MainpageService } from '../../services/mainpage.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
// export class PrincipalComponent implements OnInit {
export class PrincipalComponent {
  // data
  // mainPageService = inject(MainpageService)

  // async onSubmit(){
  // }

  // async ngOnInit() {
  //    const response = await this.mainPageService.obtenerMainPage()
  //   console.log(response.MainPage[0].textHistoria)
  //   this.data = response.MainPage[0]

  // }

}
