import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {
  @Input() isShowEdit: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }
}
