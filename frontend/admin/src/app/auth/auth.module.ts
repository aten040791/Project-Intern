import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NavComponent } from './layouts/nav/nav.component';
import { SharedModule } from '../main/shared/shared.module';
// import { ToastsComponent } from '../main/features/toasts/toasts.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ResetPasswordComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule,
    // ToastsComponent,
    TranslateModule.forChild()
  ]
})

export class AuthModule { }
