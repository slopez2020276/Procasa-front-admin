import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { UsersService } from "../services/users.service"

export const agenteMerting = () =>{

    const router = inject(Router)
    const userService = inject(UsersService)


    if(userService.getIdentidad().rol === 'user'){
        return true
    }else{
        router.navigate(['/admin'])
        return false
    }
}