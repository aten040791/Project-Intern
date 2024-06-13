import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { NavComponent } from './layouts/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailPostComponent } from './pages/detail-post/detail-post.component';
import { UpdatePostComponent } from './pages/update-post/update-post.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    NavComponent,
    HomeComponent,
    DetailPostComponent,
    UpdatePostComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
