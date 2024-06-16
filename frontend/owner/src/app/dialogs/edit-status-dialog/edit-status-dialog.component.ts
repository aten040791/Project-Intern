import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-status-dialog',
  templateUrl: './edit-status-dialog.component.html',
  styleUrls: ['./edit-status-dialog.component.css']
})
export class EditStatusDialogComponent {
  constructor() {}

  closeModal() {
    const modal = document.getElementById('edit-status-dialog');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onSubmit() {
    // Handle form submission
    this.closeModal();
  }
}
