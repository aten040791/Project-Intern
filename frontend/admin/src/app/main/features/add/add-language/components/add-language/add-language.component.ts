import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.scss']
})
export class AddLanguageComponent {

  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private http: ApiService) {}

  closeDialog(): void {
    this.close.emit();
  }

  onSubmit(formData: any) {
    // console.log(formData);
    this.http.createItem("languages", formData).subscribe({
      next: (data: any) => {
        // this.closeDialog();
        window.location.reload();
      },
      error: (error: Error) => {
        console.error(error);
      }
    })
  }
}
