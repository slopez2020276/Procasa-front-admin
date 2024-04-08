import { Component } from '@angular/core';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrl: './generales.component.css'
})
export class GeneralesComponent {
  containerAlert
  rangeValue1: number = 100;
  rangeValue2: number = 100;
  rangeValue3: number = 100;
  rangeValue4: number = 100;
  rangeValue5: number = 100;
  rangeValue6: number = 100;
  rangeValue7: number = 100;
  
  onRangeChange1(event: any) { this.rangeValue1 = event.target.value }
  onRangeChange2(event: any) { this.rangeValue1 = event.target.value }
  onRangeChange3(event: any) { this.rangeValue1 = event.target.value }
  onRangeChange4(event: any) { this.rangeValue1 = event.target.value }
  onRangeChange5(event: any) { this.rangeValue1 = event.target.value }
  onRangeChange6(event: any) { this.rangeValue1 = event.target.value }
  onRangeChange7(event: any) { this.rangeValue1 = event.target.value }

ngOnInit(): void {
  this.containerAlert = document.getElementById('background-alert')
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// S Y S T E M A      D E     A L E R T A S
AlertOption(message:string) {
  const parent: HTMLElement | any = this.containerAlert
  parent?.classList.add('show')
  const alert: HTMLElement | any = parent?.childNodes[0]
  alert?.classList.add('show')
  const inner: HTMLElement | any = alert?.childNodes[0]?.childNodes[0]
  inner!.innerText = message
  const btns: HTMLElement | any = alert?.childNodes[0]?.childNodes[1]
  btns?.classList.add('show')
}

AlertMessage(message:string, time:number) {
  const parent: HTMLElement | any = this.containerAlert
  parent?.classList.add('show')
  const alert: HTMLElement | any = parent?.childNodes[0]
  alert?.classList.add('show')
  const inner: HTMLElement | any = alert?.childNodes[0]?.childNodes[0]
  inner!.innerText = message
  const btns: HTMLElement | any = alert?.childNodes[0]?.childNodes[1]
  btns?.classList.remove('show')
  setTimeout(() => { this.AlertClose() }, time)
}


AlertClose(){
  const parent: HTMLElement | any = this.containerAlert
  parent?.classList.remove('show')
  const alert: HTMLElement | any = parent?.childNodes[0]
  alert?.classList.remove('show')
  const inner: HTMLElement | any = alert?.childNodes[0]?.childNodes[0]
  inner!.innerText = ""
  const btns: HTMLElement | any = alert?.childNodes[0]?.childNodes[1]
  btns?.classList.remove('show')
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// P L A N T I L L A      D E      S Y S T E M     A L E R T 
SystemAlert(id: number) {
  this.AlertOption("Message to Show")
  const parent: HTMLElement | any = this.containerAlert
  const btn: HTMLElement | any = parent?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[0]

  if (btn) { 
    btn.onclick = () => {
          // A C T I O N 
    }
  }
}




}
