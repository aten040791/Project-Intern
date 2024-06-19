import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.scss']
})
export class AddLanguageComponent {

  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }

}
