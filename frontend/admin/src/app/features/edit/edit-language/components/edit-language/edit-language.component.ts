import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrls: ['./edit-language.component.scss']
})
export class EditLanguageComponent {
  @Input() isShowEdit: boolean = false;
  @Output() close = new EventEmitter<any>()

  closeDialog(): void {
    this.close.emit()
  }

}
