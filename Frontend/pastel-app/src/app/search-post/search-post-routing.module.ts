import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPostComponent } from './search-post/search-post.component';

const routes: Routes = [
  {
      path: '',
      component: SearchPostComponent,
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchPostRoutingModule { }
