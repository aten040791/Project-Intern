import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-status-dialog',
  templateUrl: './edit-status-dialog.component.html',
  styleUrls: ['./edit-status-dialog.component.css']
})
export class EditStatusDialogComponent {
  @Input() selectedPostIds: number[] = [];
  postForm: FormGroup;
  showItems = false;
  selectedStatusText = '-- Choose status --';

  statuses = [
    { value: 'active', name: 'Active' },
    { value: 'inactive', name: 'Inactive' },
    { value: 'pending', name: 'Pending' },
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
      type: ['status']
    });
  }

  toggleItems() {
    this.showItems = !this.showItems;
  };

  closeModal() {
    const modal = document.getElementById('edit-status-dialog');
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
