import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home/home.component';


import { LayoutComponent } from './template/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home', 
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [AuthGuard], 
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'posts/create-post',
        loadChildren: () => import('./create-post/create-post.module').then(m => m.CreatePostModule)
      },
      {
        path: 'posts/view/:id',
        loadChildren: () => import('./view-post/view-post.module').then(m => m.ViewPostModule)
      },
      {
        path: 'posts/my-posts',
        loadChildren: () => import('./my-posts/my-posts.module').then(m => m.MyPostsModule)
      },
      {
        path: 'posts/edit/:id',
        loadChildren: () => import('./edit-post/edit-post.module').then(m => m.EditPostModule)
      },
      {
        path: 'posts/search',
        loadChildren: () => import('./search-post/search-post.module').then(m => m.SearchPostModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
