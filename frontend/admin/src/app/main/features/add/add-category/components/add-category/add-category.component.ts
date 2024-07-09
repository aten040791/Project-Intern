import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  constructor(private http: ApiService) {}

  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }

  onSubmit(data: any): void {
    this.http.createItem('categories', data).subscribe({
      next: (data: any) => { 
        // window.location.href = '/categories'
        window.location.reload();
      },
      error: (error: any) => {
        // console.log(err)
        alert(`Error fetching items: ${error.message}`)
       },
    });       
  }
}
