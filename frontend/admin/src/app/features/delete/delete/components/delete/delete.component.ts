import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  
  @Input() isDelete: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }

}
