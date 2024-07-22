import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {
  @Input() isShowEdit: boolean = false;
  @Input() item: any = {};
  @Output() close = new EventEmitter<void>();

  errors: any[] = []

  constructor( private http: ApiService) { }

  closeDialog(): void {
    this.close.emit();
  }

  onSubmit(data: any): void {
    const id = this.item.id
    this.http.updateItem('categories', data, id).subscribe({
      next: (data: any) => {
        // console.log(data)
        window.location.reload()
      },
      error: (error: any) => {
        // console.log(error)
        this.errors = error["error"]["data"]["errors"];
      }
    })
  }
  
}
