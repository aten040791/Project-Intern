import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ToastsService } from './toasts.service';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {

  toastService = inject(ToastsService)
  isShow: boolean = false

  ngOnInit(): void {
    
  }

}
