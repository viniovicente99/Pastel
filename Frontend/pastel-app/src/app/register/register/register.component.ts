import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {



   registerForm: FormGroup;

   constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService     
    )
    { this.registerForm = new FormGroup({
      name : new FormControl('',[Validators.required, Validators.minLength(3)]),
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirmPassword : new FormControl('',[Validators.required, Validators.minLength(6)])
    });
  }


  emailError(){
    this.toastr.error(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">E-mail já cadastrado.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
)};

  signUpError(){
    this.toastr.error(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">Erro ao criar conta.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
)};

 onSubmit(){
    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if(!name || !email || !password || !confirmPassword){
      this.registerForm.markAllAsTouched();
      return;
     };

 
   this.userService.createUser(this.registerForm.value).subscribe({   
    next: () => this.goHome(),
    error: (err) => {
      if (err.error.code === 'EMAIL_ALREADY_EXISTS'){
       return this.emailError();
      }else{
        return this.signUpError();
      }
    }
  })
}
 

 isfieldValid(fieldName: string) : boolean{
  const field = this.registerForm.get(fieldName)
  return (field?.invalid && field.touched && field.errors?.['required']) || false;

 };

 passwordMatch(passwordField: string, confirmPasswordField : string) : boolean {
  const password = this.registerForm.get(passwordField)?.value;
  const confirmPassword = this.registerForm.get(confirmPasswordField)?.value;

  return password && confirmPassword && password !== confirmPassword;
 };

 checkFieldLenght(fieldName: string): boolean {
  const field = this.registerForm.get(fieldName)
  return !!(field?.touched && field.errors?.['minlength']
)};

  checkEmail(email: string): boolean {
  const field = this.registerForm.get(email)
  return !!(field?.errors?.['email'] && (field.touched || field.dirty))
};

  goHome(){
  this.router.navigate(['/home'])
};

  goToLogin(){
  this.router.navigate(['/login'])
};

};





