import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent {
  constructor() {}

  closeModal() {
    const modal = document.getElementById('edit-category-dialog');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onSubmit() {
    // Handle form submission
    this.closeModal();
  }
}
