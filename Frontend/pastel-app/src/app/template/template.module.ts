import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LucideAngularModule } from 'lucide-angular';






@NgModule({
  declarations: [
    LayoutComponent,
    
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    LucideAngularModule,



]
})
export class TemplateModule { }
