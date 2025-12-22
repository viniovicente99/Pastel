import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

   constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService     
    )
    { this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required, Validators.minLength(6)]),
    });
  }

  loginSubmit() {

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if(!email || !password){
      this.loginForm.markAllAsTouched();
      return;
    }

  this.userService.login(this.loginForm.value).subscribe({
    next: (res: any) => {
      const token = res.accessToken;

      localStorage.setItem('accessToken', token);

      const payload = JSON.parse(atob(token.split('.')[1]));

      const name = payload.name;

      localStorage.setItem('user', JSON.stringify({ name }));

      this.goHome();
    },
    error: (err) => {
    if(err.error && err.error.code === 'INCORRECT_CREDENTIALS'){
      this.incorretCredentials();
    } else {
      this.loginError();
    }
  }
  });
 }

 isfieldValid(fieldName: string) : boolean{
  const field = this.loginForm.get(fieldName)
  return (field?.invalid && field.touched && field.errors?.['required']) || false;

 };

 goHome(){
  this.router.navigate(['/home'])
};

incorretCredentials(){
    this.toastr.error(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">E-mail ou senha incorretos.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
)};

loginError(){
    this.toastr.error(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">Erro ao fazer login.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
)};

}
