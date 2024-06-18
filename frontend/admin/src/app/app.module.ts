import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NavComponent } from './layouts/nav/nav.component';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguagePageComponent } from './pages/language-page/language-page.component';
import { AddUserComponent } from './features/add/add-user/components/add-user/add-user.component';
import { AddCategoryComponent } from './features/add/add-category/components/add-category/add-category.component';
import { AddLanguageComponent } from './features/add/add-language/components/add-language/add-language.component';
import { DeleteComponent } from './features/delete/delete/components/delete/delete.component';
import { PaginationComponent } from './features/pagination/components/pagination/pagination.component';
import { EditUserComponent } from './features/edit/edit-user/components/edit-user/edit-user.component';
import { EditCategoryComponent } from './features/edit/edit-category/components/edit-category/edit-category.component';
import { EditLanguageComponent } from './features/edit/edit-language/components/edit-language/edit-language.component';
import { ViewDetailComponent } from './pages/view-detail/components/view-detail/view-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserPageComponent,
    NavComponent,
    SideBarComponent,
    CategoryPageComponent,
    LanguagePageComponent,
    AddUserComponent, 
    AddCategoryComponent, 
    AddLanguageComponent, 
    DeleteComponent, 
    PaginationComponent, EditUserComponent, EditCategoryComponent, EditLanguageComponent, ViewDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
