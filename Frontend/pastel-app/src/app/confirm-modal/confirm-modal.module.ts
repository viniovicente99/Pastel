import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmModalRoutingModule } from './confirm-modal-routing.module';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { LucideAngularModule } from 'lucide-angular';








@NgModule({
  declarations: [
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    ConfirmModalRoutingModule,
    LucideAngularModule,
  ]
})
export class ConfirmModalModule { }
