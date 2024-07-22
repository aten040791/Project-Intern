import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.scss']
})
export class AddLanguageComponent {

  constructor(private http: ApiService) {}

  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();
  selectedFile: File | null = null;

  errors: any[] = []

  closeDialog(): void {
    this.close.emit();
  }

  onSubmit(form: any) {
    
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('locale', form.locale);

    if (this.selectedFile) {
      formData.append('flag', this.selectedFile);
    }

    this.http.createItem("languages", formData).subscribe({
      next: (data: any) => {
        window.location.reload();
      },
      error: (error: any) => {
        // console.error(error);
        // alert(`Error fetching items: ${error.message}`)
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
