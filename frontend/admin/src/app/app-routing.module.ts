import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LanguagePageComponent } from './pages/language-page/language-page.component';
import { ViewDetailComponent } from './pages/view-detail/components/view-detail/view-detail.component';
  
const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'categories', component: CategoryPageComponent },
  { path: 'users', component: UserPageComponent },
  { path: 'languages', component: LanguagePageComponent },
  { path: 'users/view-detail/:id', component: ViewDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
