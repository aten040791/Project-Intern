import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }

}
