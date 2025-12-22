import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPostRoutingModule } from './view-post-routing.module';
import { ViewPostComponent } from './view-post/view-post.component';
import { FormsModule } from "@angular/forms";
import { DialogModule } from '@angular/cdk/dialog';



@NgModule({
  declarations: [
    ViewPostComponent
  ],
  imports: [
    CommonModule,
    ViewPostRoutingModule,
    FormsModule
]
})
export class ViewPostModule { }
