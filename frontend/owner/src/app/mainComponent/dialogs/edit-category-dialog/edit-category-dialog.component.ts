import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css'],
})
export class EditCategoryDialogComponent {
  @Input() selectedPostIds: number[] = [];
  postForm: FormGroup;
  responseDataCategory: any[] = [];
  showItems = false;
  selectedCategoryText = '-- Choose category --';

  faFloppyDisk = faFloppyDisk;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router) {
    library.add(faFloppyDisk);
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPostIds'] && changes['selectedPostIds'].currentValue) {
      this.postForm.controls['Ids'].setValue(this.selectedPostIds);
    }
  };

  ngOnInit(): void {
    this.getDataCategory();
  }

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe(
      response => {
        if (Array.isArray(response.data)) {
          this.responseDataCategory = response.data;
        } else {
          this.responseDataCategory = [];
        }
      },
      error => {
        console.error('Failed to fetch categories:', error);
      }
    );
  }

  createForm() {
    this.postForm = this.fb.group({
      Ids: [this.selectedPostIds],
      value: ['', Validators.required],
      type: ['category_id'],
    });
  }

  toggleItems() {
    this.showItems = !this.showItems;
  }

  closeModal() {
    const modal = document.getElementById('edit-category-dialog');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onSubmit() {
    if (this.postForm.valid) {
      const formData = {
        ...this.postForm.value,
      };
      this.apiService.updateCategory(formData).subscribe({
        next: (response) => {
          console.log('Post update category successfully', response);
          this.router.navigate(['/post']);
          window.location.reload();
        },
        error: (error) => {
          console.error('Failed to update category post', error);
          alert('Failed to update category post');
        },
      });
      this.closeModal();
    }
  }
}
