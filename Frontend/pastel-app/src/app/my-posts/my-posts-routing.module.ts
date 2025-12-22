import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPostsComponent } from './my-posts/my-posts.component';

const routes: Routes = [
  {
      path: '',
      component: MyPostsComponent,
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPostsRoutingModule { }
