import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent {
  @Input() selectedPostIds: number[] = [];
  postForm: FormGroup;
  showItems = false;
  selectedCategoryText = '-- Choose category --';
  
  categories = [
    { value: 'blog', name: 'Blog' },
    { value: 'newspaper', name: 'Newspaper' },
    { value: 'travel', name: 'Travel' },
    { value: 'sport', name: 'Sport' },
  ]

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPostIds'] && changes['selectedPostIds'].currentValue) {
      this.postForm.controls['Ids'].setValue(this.selectedPostIds);
    }
  };

  ngOnInit() {};

  createForm() {
    this.postForm = this.fb.group({
      Ids: [this.selectedPostIds],
      value: ['', Validators.required],
      type: ['category']
    });
  }

  toggleItems() {
    this.showItems = !this.showItems;
  };

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
      console.log(formData);
    } else {
      console.log('Form is invalid');
    }
    this.closeModal();
  }
}
