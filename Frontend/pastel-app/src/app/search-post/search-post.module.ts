import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPostRoutingModule } from './search-post-routing.module';
import { SearchPostComponent } from './search-post/search-post.component';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    SearchPostComponent
  ],
  imports: [
    CommonModule,
    SearchPostRoutingModule,
    LucideAngularModule,
    FormsModule
]
})
export class SearchPostModule { }
