import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Dialog } from '@angular/cdk/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from '../../loading/loading/loading.component';



@Component({
  selector: 'app-search-post',
  standalone: false,
  templateUrl: './search-post.component.html',
  styleUrl: './search-post.component.scss'
})
export class SearchPostComponent{

  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private dialog: Dialog,
    private toastr: ToastrService
  ){};

  searchTerm: string = '';

  SearchPost(searchTerm: string){
    const loadingRef = this.dialog.open(LoadingComponent, {
    disableClose: true
  });
    this.postService.searchPost(searchTerm).subscribe({
      next: (posts) => {
      this.posts = posts;
      if(posts.length === 0 ){
        this.noResults();
        loadingRef.close()
      }
      loadingRef.close()
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

noResults(){
    this.toastr.warning(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">Nenhum Post encontrado.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
)};


}
