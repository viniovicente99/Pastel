import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal/confirm-modal.component';
import { SucessModalComponent } from '../../sucess-modal/sucess-modal/sucess-modal.component';
import { LoadingComponent } from '../../loading/loading/loading.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { NavService } from '../../services/nav.service';





@Component({
  selector: 'app-edit-post',
  standalone: false,
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit {

  @Input() posts: any;

  post!: Post;
  editPostForm: FormGroup;

  selectedImages: File[] = [];      
  existingImages: string[] = [];    
  removedImages: string[] = [];     

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private dialog: Dialog,
    private navService: NavService
  ) {
    this.editPostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      category: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      content: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');

    if (!postId) {
      this.postIDError();
      return;
    }

    this.postService.getPostById(postId).subscribe(post => {
      this.post = post;

      this.editPostForm.patchValue({
        title: post.title,
        description: post.description,
        category: post.category,
        content: post.content
      });

      this.existingImages = post.imageUrls || [];
    });
  }

  onImageSelected(event: any) {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      if (this.existingImages.length + this.selectedImages.length >= 5) break;
      this.selectedImages.push(files[i]);
    }

    event.target.value = '';
  }

  getImagePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  removeExistingImage(index: number) {
    const removed = this.existingImages.splice(index, 1)[0];
    this.removedImages.push(removed);
  }

  removeSelectedImage(index: number) {
    this.selectedImages.splice(index, 1);
  }


  editPostSubmit() {

    if (this.editPostForm.invalid) {
      this.editPostForm.markAllAsTouched();
      return;
    }

    this.navService.close();

    const loadingRef = this.dialog.open(LoadingComponent, {
      disableClose: true
    });

    const formData = new FormData();

    formData.append('title', this.editPostForm.value.title);
    formData.append('description', this.editPostForm.value.description);
    formData.append('category', this.editPostForm.value.category);
    formData.append('content', this.editPostForm.value.content);
-
    this.selectedImages.forEach(file => {
      formData.append('images', file);
    });


    this.removedImages.forEach(img => {
      formData.append('removedImages', img);
    });

    this.postService.editPost(this.post.id, formData).subscribe({
    next: () => {
      loadingRef.close(); 
      this.dialog.open(SucessModalComponent, {
        data: { message: 'Post alterado com sucesso!' }
      }).closed.subscribe(() => {
        this.goToMyPosts(); 
      });
    },
    error: () => {
      loadingRef.close();
      this.errorEditingPost();
    }
  });
  }


  isfieldValid(fieldName: string): boolean {
    const field = this.editPostForm.get(fieldName);
    return !!(field?.invalid && field?.touched && field?.errors?.['required']);
  }

  titleLength(): boolean {
    const v = this.editPostForm.get('title')?.value || '';
    return v.length > 0 && v.length < 5;
  }

  descriptionLength(): boolean {
    const v = this.editPostForm.get('description')?.value || '';
    return v.length > 0 && v.length < 5;
  }

  categoryLength(): boolean {
    const v = this.editPostForm.get('category')?.value || '';
    return v.length > 0 && (v.length < 2 || v.length > 20);
  }

  contentLength(): boolean {
    const v = this.editPostForm.get('content')?.value || '';
    return v.length > 0 && v.length < 5;
  }

  protected openModal(action: 'edit') {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { message: 'Tem certeza que deseja alterar esse Post?' }
    });

    dialogRef.closed.subscribe(confirmed => {
      if (confirmed) this.editPostSubmit();
    });
  }

  goToMyPosts() {
    this.router.navigate(['/posts/my-posts']);
  }

  postIDError(){
    this.toastr.error(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">Erro ao encontrar Post.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
)};

  errorEditingPost(){
    this.toastr.error(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">Erro ao editar Post.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
)};
}

