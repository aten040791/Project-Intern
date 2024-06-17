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
    AddLanguageComponent, DeleteComponent
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
