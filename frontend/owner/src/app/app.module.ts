import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailPostComponent } from './pages/detail-post/detail-post.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    DetailPostComponent,
    AccountPageComponent,
    UpdatePostComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
