import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-status-dialog',
  templateUrl: './edit-status-dialog.component.html',
  styleUrls: ['./edit-status-dialog.component.css'],
})
export class EditStatusDialogComponent {
  @Input() selectedPostIds: number[] = [];
  postForm: FormGroup;
  showItems = false;
  selectedStatusText = '-- Choose status --';

  faFloppyDisk = faFloppyDisk;

  statuses = [
    { value: 'false', name: 'Hidden' },
    { value: 'true', name: 'Display' },
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router ) {
    library.add(faFloppyDisk);
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPostIds'] && changes['selectedPostIds'].currentValue) {
      this.postForm.controls['Ids'].setValue(this.selectedPostIds);
    }
  }

  ngOnInit() {}

  createForm() {
    this.postForm = this.fb.group({
      Ids: [this.selectedPostIds],
      value: ['', Validators.required],
      type: ['status'],
    });
  }

  toggleItems() {
    this.showItems = !this.showItems;
  }

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
      this.apiService.updateStatus(formData).subscribe({
        next: (response) => {
          console.log('Post update status successfully', response);
          this.router.navigate(['/post']);
          window.location.reload();
        },
        error: (error) => {
          console.error('Failed to update status post', error);
          alert('Failed to update status post');
        },
      });
      this.closeModal();
    }
  }
}
