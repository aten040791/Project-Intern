import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-mutipal-post',
  templateUrl: './delete-mutipal-post.component.html',
  styleUrls: ['./delete-mutipal-post.component.css']
})
export class DeleteMutipalPostComponent {
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
