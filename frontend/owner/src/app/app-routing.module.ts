// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMainComponent } from './mainComponent/layout-main.component';
import { LayoutAuthComponent } from './authComponent/layout-auth.component';
import { HomeComponent } from './mainComponent/pages/home/home.component';
import { AccountPageComponent } from './mainComponent/pages/account-page/account-page.component';
import { UpdatePostComponent } from './mainComponent/pages/update-post/update-post.component';
import { CreatePostComponent } from './mainComponent/pages/create-post/create-post.component';
import { DetailPostComponent } from './mainComponent/pages/detail-post/detail-post.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./mainComponent/layout-main.module').then(m => m.LayoutMainModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./authComponent/layout-auth.module').then(m => m.LayoutAuthModule)
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
