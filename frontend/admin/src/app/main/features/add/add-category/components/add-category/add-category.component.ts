import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private http: ApiService) {}

  closeDialog(): void {
    this.close.emit();
  }

  onSubmit(data: any): void {
    this.http.createItem('categories', data).subscribe({
      next: (data: any) => { 
        // console.log(data)
        // window.location.reload()
        window.location.href = '/categories'
      },
      error: (err: any) => {
        console.log(err)
       },
    });       
  }
}
