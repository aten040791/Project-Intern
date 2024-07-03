import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-delete-mutipal-post',
  templateUrl: './delete-mutipal-post.component.html',
  styleUrls: ['./delete-mutipal-post.component.css']
})
export class DeleteMutipalPostComponent implements OnInit {
  @Input() selectedPostIds: number[] = [];
  postForm: FormGroup;

  faFloppyDisk = faFloppyDisk;
  
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router) {
      library.add(faFloppyDisk);
    this.createForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPostIds'] && changes['selectedPostIds'].currentValue) {
      this.postForm.controls['Ids'].setValue(this.selectedPostIds);
    }
  };

  createForm() {
    this.postForm = this.fb.group({
      Ids: [this.selectedPostIds],
    });
  }

  closeModal() {
    const modal = document.getElementById('delete-mutipal-post');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onDelete() {
    if (this.postForm.valid) {
      const formData = {
        ...this.postForm.value,
      }
      this.apiService.deletePost(formData).subscribe({
        next: (response) => {
          console.log('Post delete successfully', response);
          this.router.navigate(['/post']);
          window.location.reload();
        },
        error: (error) => {
          console.error('Failed to delete post', error);
          alert('Failed to delete post');
        }
      });
    }
    this.closeModal();
  }
}
