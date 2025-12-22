import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPostsRoutingModule } from './my-posts-routing.module';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { LucideAngularModule } from 'lucide-angular';

@NgModule({
  declarations: [
    MyPostsComponent
  ],
  imports: [
    CommonModule,
    MyPostsRoutingModule,
    LucideAngularModule
  ]
})
export class MyPostsModule { }
