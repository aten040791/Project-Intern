import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }
}
