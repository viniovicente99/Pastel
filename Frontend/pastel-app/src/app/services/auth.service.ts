import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private router: Router){}

    logOut(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    getUserName(){
        const user = localStorage.getItem('user');
        console.log('User do localstorage', user);
        return user ? JSON.parse(user).username : 'visitante';
    }
};