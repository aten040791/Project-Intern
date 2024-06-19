import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-mutipal-post',
  templateUrl: './delete-mutipal-post.component.html',
  styleUrls: ['./delete-mutipal-post.component.css']
})
export class DeleteMutipalPostComponent implements OnInit {
  @Input() selectedPostIds: number[] = [];
  postForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPostIds'] && changes['selectedPostIds'].currentValue) {
      console.log(this.selectedPostIds);
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
