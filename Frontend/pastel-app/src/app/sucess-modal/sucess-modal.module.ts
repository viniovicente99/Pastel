import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { SucessModalRoutingModule } from './sucess-modal-routing.module';
import { SucessModalComponent } from './sucess-modal/sucess-modal.component';


@NgModule({
  declarations: [
    SucessModalComponent
  ],
  imports: [
    CommonModule,
    SucessModalRoutingModule,
    LucideAngularModule
  ]
})
export class SucessModalModule { }
