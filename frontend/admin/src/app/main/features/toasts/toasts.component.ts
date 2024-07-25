import { Component, EventEmitter, inject, Input, Output, TemplateRef } from '@angular/core';
import { ToastsService } from './toasts.service';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-toasts',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})

export class ToastsComponent {

  toastService = inject(ToastsService)

}
