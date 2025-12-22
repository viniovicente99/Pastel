import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { FullscreenImageComponent } from '../../fullscreen-image/fullscreen-image/fullscreen-image.component';
import { LoadingComponent } from '../../loading/loading/loading.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-view-post',
  standalone: false,
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})
export class ViewPostComponent implements OnInit {

  @Input() posts: any;  

  post!: Post;

  
  errorLoadingPost(){
    this.toastr.error(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">Erro ao carregar Posts.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
)};

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private dialog: Dialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    const loadingRef = this.dialog.open(LoadingComponent, {
      disableClose: true
    });

    const postId = this.route.snapshot.paramMap.get('id');
    
    if (postId){
    this.postService.getPostById(postId).subscribe({
      next: (post) => { 
        this.post = post;
        loadingRef.close();
      }, error: () => {
          loadingRef.close();
          this.errorLoadingPost();
      },
      });
    }
  }

  openImageFullScreen(url: string){
    this.dialog.open(FullscreenImageComponent, {
      data: { url },
      width: '100vw',
      height: '100vh',
      panelClass: 'fullscreen-dialog',
})};
  
}
