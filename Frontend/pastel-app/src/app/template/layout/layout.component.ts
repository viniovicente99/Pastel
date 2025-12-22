import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  expandedNav = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ){
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.expandedNav = false;
    })
  }
  

   toggleSideBar() {
    this.expandedNav= !this.expandedNav;
  }

  logOut(){
    this.authService.logOut()
    this.logOutSuccess();
  };

  logOutSuccess(){
    this.toastr.success(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none w-auto max-w-xs">
     <h4 class="font-bold w-full">Logout realizado com sucesso.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
)};

}
