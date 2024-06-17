import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
import { EditLanguageDialogComponent } from './dialogs/edit-language-dialog/edit-language-dialog.component';
import { EditStatusDialogComponent } from './dialogs/edit-status-dialog/edit-status-dialog.component';
import { EditCategoryDialogComponent } from './dialogs/edit-category-dialog/edit-category-dialog.component';
import { DeleteMutipalPostComponent } from './dialogs/delete-mutipal-post/delete-mutipal-post.component';

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
    CreatePostComponent,
    EditLanguageDialogComponent,
    EditStatusDialogComponent,
    EditCategoryDialogComponent,
    DeleteMutipalPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
