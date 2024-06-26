import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrls: ['./edit-language.component.scss']
})
export class EditLanguageComponent {
  @Input() isShowEdit: boolean = false;
  @Input() item: any = {};
  @Output() close = new EventEmitter<any>()

  constructor(private http: ApiService) { }

  closeDialog(): void {
    this.close.emit()
  }

  onSubmit(data: any): void {
    const id = this.item.id
    this.http.updateItem('languages', data, id).subscribe({
      next: (data: any) => {
        window.location.reload()
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

}
