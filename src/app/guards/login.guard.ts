import { inject } from "@angular/core"
import { Router } from "@angular/router"

export const loginGuard = () =>{

    const router = inject(Router)
    var identidad2 = JSON.parse(localStorage.getItem('identidad') as string)
    console.log(identidad2.rol)
    if(localStorage.getItem('token')){
        return true
    }else{
        router.navigate(['/admin'])
        return false
    }


}