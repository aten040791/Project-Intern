import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LanguagePageComponent } from './pages/language-page/language-page.component';
import { ViewDetailComponent } from './pages/view-detail/components/view-detail/view-detail.component';
import { MyProfilePageComponent } from './pages/my-profile-page/components/my-profile-page/my-profile-page.component';
import { MainComponent } from './main.component';
  
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      { path: 'categories', component: CategoryPageComponent },
      { path: 'users', component: UserPageComponent },
      { path: 'languages', component: LanguagePageComponent },
      { path: 'users/view-detail/:id', component: ViewDetailComponent },
      { path: 'my-profile', component: MyProfilePageComponent },
    ]
  },
  
  // { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }
