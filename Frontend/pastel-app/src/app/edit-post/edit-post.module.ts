import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPostRoutingModule } from './edit-post-routing.module';
import { EditPostComponent } from './edit-post/edit-post.component';
import { LucideAngularModule } from 'lucide-angular';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';




@NgModule({
  declarations: [
    EditPostComponent
  ],
  imports: [
    CommonModule,
    EditPostRoutingModule,
    LucideAngularModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditPostModule { }
