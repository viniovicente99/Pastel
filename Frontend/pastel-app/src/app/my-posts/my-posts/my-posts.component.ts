import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model'
import { Dialog } from '@angular/cdk/dialog';
import { LoadingComponent } from '../../loading/loading/loading.component';
import { ActivatedRoute} from '@angular/router';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal/confirm-modal.component';
import { SucessModalComponent } from '../../sucess-modal/sucess-modal/sucess-modal.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-my-posts',
  standalone: false,
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss'
})
export class MyPostsComponent implements OnInit{

  posts: Post[] = [];
  

  constructor(
    private postService : PostService,
    private dialog: Dialog,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {

      const loadingRef = this.dialog.open(LoadingComponent, {
      disableClose: true
      
    });
  

  this.postService.myPosts().subscribe({
    next: (posts) => {
      this.posts = posts;
      loadingRef.close()
    },
    error: () => {
      loadingRef.close();
      this.errorLoadingPosts();
      
    }
  });

}

deletePost(postID: string, index: number) {

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { message: 'Tem certeza que deseja excluir o post?'}
    });

    dialogRef.closed.subscribe(confirmed => {
      if (confirmed){
         this.postService.deletePost(postID).subscribe({
      next: (posts) => {

        this.dialog.open(SucessModalComponent, {
          data: { message: 'Post excluído com sucesso!'}
        })

        this.posts.splice(index, 1)

      } , error: () => {

        this.deleteError();
                
      }
    })
      }
    })
  }

  deleteError(){
    this.toastr.error(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">Erro ao excluir Post.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
)};

errorLoadingPosts(){
    this.toastr.error(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">Erro ao carregar Posts.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
)};
}
