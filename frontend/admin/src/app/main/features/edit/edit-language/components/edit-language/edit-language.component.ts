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
  selectedFile: File | null = null;

  errors: any[] = [];

  constructor(private http: ApiService) { }

  closeDialog(): void {
    this.close.emit()
  }

  onSubmit(form: any): void {
    const id = this.item.id
    
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('locale', form.locale);
    
    if (this.selectedFile) {
      formData.append('flag', this.selectedFile);
    }

    this.http.updateItem("languages", formData, id).subscribe({
      next: (data: any) => {
        window.location.reload();
      },
      error: (error: any) => {
        // console.error(error);
        this.errors = error["error"]["data"]["errors"];
      }
    })
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

}
