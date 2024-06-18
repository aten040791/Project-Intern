import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { DetailPostComponent } from './pages/detail-post/detail-post.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'account-page', component: AccountPageComponent },
  { path: 'update-post/:id', component: UpdatePostComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'detail-post/:id', component: DetailPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
