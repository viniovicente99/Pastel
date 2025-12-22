import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingRoutingModule } from './loading-routing.module';
import { LoadingComponent } from './loading/loading.component';
import { LucideAngularModule } from 'lucide-angular';


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    LoadingRoutingModule,
    LucideAngularModule
  ]
})
export class LoadingModule { }
