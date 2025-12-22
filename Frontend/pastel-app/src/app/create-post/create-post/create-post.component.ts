import { Component, inject, Input } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal/confirm-modal.component';
import { SucessModalComponent } from '../../sucess-modal/sucess-modal/sucess-modal.component';
import { LoadingComponent } from '../../loading/loading/loading.component';
import { NavService } from '../../services/nav.service';





@Component({
  selector: 'app-create-post',
  standalone: false,
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {

  createPostForm: FormGroup;  
  selectedImages: File[] = [];
  userID!: string;
  

  constructor(
    private postService: PostService,
    private toastr: ToastrService,
    private dialog: Dialog,
    private navService: NavService
  )
  {
    const token = localStorage.getItem('accessToken');

    let userID = null;


    if(token){

    const payload = JSON.parse(atob(token.split('.')[1]));
    userID = payload.id;
    }    

    this.createPostForm = new FormGroup ({      
      
      title : new FormControl ('', [Validators.required, Validators.minLength(5)]),
      description : new FormControl ('', [Validators.required, Validators.minLength(5)]),
      category : new FormControl ('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      content : new FormControl ('', [Validators.required, Validators.minLength(5)]),

    })
  }

  onImageSelected(event: any) {
  const files: FileList = event.target.files;

  for (let i = 0; i < files.length; i++) {
    if (this.selectedImages.length >= 5) {
      break;
    }

    this.selectedImages.push(files[i]);
  }

  event.target.value = '';
  }

  getImagePreview(file: File): string {
    return URL.createObjectURL(file);
  };

  removeImage(index: number) {
  this.selectedImages.splice(index, 1);
  }  

  isfieldValid(fieldName: string) : boolean{
      const field = this.createPostForm.get(fieldName)
      return (field?.invalid && field.touched && field.errors?.['required']) || false;
  }

  titleLength(): boolean {
      const field = this.createPostForm.get('title');
      const value = field?.value || '';
      return value.length >= 1 && value.length < 5 && field?.touched && field?.invalid ? true : false;

  };

  descriptionLength(): boolean {
      const field = this.createPostForm.get('description');
      const value = field?.value || '';
      return value.length >= 1 && value.length < 5 && field?.touched && field?.invalid ? true : false;

  };

  categoryLength(): boolean {
      const field = this.createPostForm.get('category');
      const value = field?.value || '';
      return value.length > 0 && value.length < 2 || value.length > 20 && field?.touched && field?.invalid ? true : false;

  };

  contentLength(): boolean {
      const field = this.createPostForm.get('content');
      const value = field?.value || '';
      return value.length >= 1 && value.length < 5 && field?.touched && field?.invalid ? true : false;

  };


  createPostSubmit(){    
    
    if(this.createPostForm.invalid){
      this.createPostForm.markAllAsTouched();
      return;
  };

  this.navService.close();

  const loadingRef = this.dialog.open(LoadingComponent, {
    disableClose: true
  });

  const formData = new FormData();

  id_user : new FormControl('',[Validators.required]),

  formData.append('id_user', this.createPostForm.value.id_user);
  formData.append('title', this.createPostForm.value.title);
  formData.append('description', this.createPostForm.value.description);
  formData.append('category', this.createPostForm.value.category);
  formData.append('content', this.createPostForm.value.content);

  this.selectedImages.forEach(file => {
      formData.append('images', file);
  })    

  this.postService.createPost(formData).subscribe({
    next: (res: any) => {

      loadingRef.close();

      this.createPostForm.reset();
      this.selectedImages = [];
      this.createPostForm.patchValue({
        id_user: this.userID
      });
      this.dialog.open(SucessModalComponent, {
        data: { message: 'Post criado com sucesso!' }
      }
      
  )}, 
    error: (err) => {

      loadingRef.close();

      if(err.error && err.error.code === 'TITLE_ALREDY_EXISTS'){
    this.duplicateTitle();
    } else
    return this.errorCreatingPost();
  }
      
  });
  }

  duplicateTitle(){
    this.toastr.error(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">Título já existente.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
  )};

  errorCreatingPost(){
    this.toastr.error(
  `<div class="text-white p-2 rounded-lg border-0 shadow-none break-words w-auto max-w-xs">
     <h4 class="font-bold">Erro ao criar post.</h4>
   </div>`,
  '',
  { enableHtml: true, timeOut: 4000, closeButton: true, progressBar: true,}
  )};

  protected openModal(action: 'create'){

    const message = {
      create: 'Tem certeza que deseja criar esse Post?',
    };

    

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {message: message[action] }
    });

    dialogRef.closed.subscribe(confirmed => {
      if(confirmed){
        this.createPostSubmit();

      }
    });

  };
  
}


