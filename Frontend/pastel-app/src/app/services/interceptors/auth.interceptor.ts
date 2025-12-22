import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";


@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,

  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('accessToken');

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401 || err.status === 403) {
          
          localStorage.removeItem('accessToken');
          this.router.navigate(['/login']);
        }

        return throwError(() => err);
      })
    );
  }
  
}
