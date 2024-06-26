import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  
  @Input() isDelete: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() closeSuccess = new EventEmitter<void>();
  @Output() isDeleteSuccess = new EventEmitter<void>();
  @Output() isDeleteFailed = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
    this.isDeleteFailed.emit();
  }

  closeDialogSuccess(): void {
    this.closeSuccess.emit();
    this.isDeleteSuccess.emit();
  }
  
}
