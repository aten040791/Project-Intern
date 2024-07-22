import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './duration/duration.pipe';
// import { ToastsComponent } from '../features/toasts/toasts.component';

@NgModule({
  declarations: [DurationPipe, ],
  imports: [
    CommonModule
  ],
  exports: [DurationPipe, ]
})
export class SharedModule { }
