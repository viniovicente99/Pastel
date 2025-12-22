import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateModule } from './template/template.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { CreatePostModule } from './create-post/create-post.module';
import { ConfirmModalModule } from './confirm-modal/confirm-modal.module'
import { SucessModalModule } from './sucess-modal/sucess-modal.module';
import { LoadingModule } from './loading/loading.module';
import
{ LucideAngularModule,ChevronsRight, ChevronsLeft, CircleGauge, Pencil, Search, House,
CircleArrowRight, CircleArrowLeft, LogOut, FilePlusCorner, ImageUp, CircleAlert, CircleCheckBig, Ellipsis, LoaderCircle,
FileQuestionMark, Trash2
}from 'lucide-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { ViewPostModule } from './view-post/view-post.module';
import { MyPostsModule } from './my-posts/my-posts.module';
import { EditPostModule } from './edit-post/edit-post.module';
import { SearchPostModule } from './search-post/search-post.module';












@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    LoginModule,
    RegisterModule,
    CreatePostModule,
    ConfirmModalModule,
    SucessModalModule,
    LoadingModule,
    ViewPostModule,
    MyPostsModule,
    EditPostModule,
    SearchPostModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 3,
      autoDismiss: true,
      preventDuplicates: true
    }),
    LucideAngularModule.pick({
      House,
      ChevronsRight,
      ChevronsLeft,
      CircleGauge,
      Pencil,
      Search,
      CircleArrowRight,
      CircleArrowLeft,
      LogOut,
      FilePlusCorner,
      ImageUp,
      CircleAlert,
      CircleCheckBig,
      Ellipsis,
      LoaderCircle,
      FileQuestionMark,
      Trash2
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
