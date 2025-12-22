import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucessModalComponent } from './sucess-modal/sucess-modal.component';

const routes: Routes = [
  {
      path: 'sucess',
      component: SucessModalComponent,
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucessModalRoutingModule { }
