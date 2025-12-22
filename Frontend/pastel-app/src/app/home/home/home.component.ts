import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model'
import { LoadingComponent } from '../../loading/loading/loading.component';
import { Dialog } from '@angular/cdk/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';







@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  

  posts: Post[] = []

  userName: string = '';

  constructor(
    private postService : PostService,
    private dialog: Dialog,
    private toastr: ToastrService,
    private authService: AuthService
  ){

  }

  ngOnInit(): void {

    this.getUserName();  

    const loadingRef = this.dialog.open(LoadingComponent, {
    disableClose: true

  });

  this.postService.getPosts().subscribe({
    next: (posts) => {
      this.posts = posts;
      loadingRef.close();
    },
    error: () => {
      loadingRef.close();
      this.errorLoadingPosts();
    }
  });
  }
  errorLoadingPosts(){
    this.toastr.error(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">Erro ao carregar Posts.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
  )};

  getUserName(){

    const userStr = localStorage.getItem('user');
    if(userStr){
      const user = JSON.parse(userStr);
      this.userName = user.name || 'Visitante';

    } else {
      this.userName = 'Visitante';
    };

  }
} 
   


