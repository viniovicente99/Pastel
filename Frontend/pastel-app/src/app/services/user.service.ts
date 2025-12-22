import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Toast, ToastrService } from 'ngx-toastr';




@Injectable({
    providedIn: 'root'
})

export class UserService{

    private url = environment.api

    constructor (
        private httpClient: HttpClient,
        private toastr: ToastrService
    )

    {};

    createUser(data: any){
        return this.httpClient.post<User>(`${this.url}/users/register`, data)
    };

    login(data: any){
        return this.httpClient.post<any>(`${this.url}/users/login`, data)
    };
};