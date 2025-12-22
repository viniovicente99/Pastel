import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePostRoutingModule } from './create-post-routing.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { LucideAngularModule } from 'lucide-angular';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';



@NgModule({
  declarations: [
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreatePostRoutingModule,
    LucideAngularModule
  ]
})
export class CreatePostModule { }
