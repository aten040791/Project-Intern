import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from '../../featrue/toasts/toasts.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {
  @Input() Keyword: string = '';
  @Input() page: number = 1;
  @Input() perPage: number = 10;
  @Output() filterApplied = new EventEmitter<{ status: string, categories: number[] }>();

  postForm: FormGroup;
  responseDataCategory: any[] = [];
  selectedStatusText = '-- Choose status --';
  selectedCategoryText = '-- Choose category --';
  selectedCategories: number[] = [];

  faFloppyDisk = faFloppyDisk;
  toastService = inject(ToastsService);

  statuses = [
    { value: 'false', name: 'Hidden' },
    { value: 'true', name: 'Active' },
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    library.add(faFloppyDisk);
  };

  ngOnInit() {
    this.getDataCategory();
    this.createForm();
  };

  createForm() {
    this.postForm = this.fb.group({
      status: [''],
      categories: [[]],
    });
  };

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
        this.toastService.show({ template: 'Error fetching categories', classname: 'bg-danger text-light', delay: 3000 });
      }
    );
  };

  onCategoryChange(event: any) {
    const categoryId = +event.target.value;
    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      const index = this.selectedCategories.indexOf(categoryId);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.postForm.patchValue({ categories: this.selectedCategories });
  };

  closeModal() {
    const modal = document.getElementById('filter-dialog');
    if (modal) {
      modal.style.display = 'none';
    }
  };

  onSubmit() {
    const status = this.postForm.get('status')?.value || '';
    const categoryIds = this.postForm.get('categories')?.value || [];

    if (this.postForm.valid) {
      this.filterApplied.emit({ status, categories: categoryIds });
      this.closeModal();
    }
  };
}
