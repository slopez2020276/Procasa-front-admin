import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  constructor(){
  }


  ngOnInit(){
  document.getElementById("time")?.classList.add("timeoff")
  // document.getElementById("container-alert")?.classList.add("hide")
}

}
