import { state } from '@angular/animations';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faSliders, faEllipsisV, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, DoCheck {
  responseData: any[] = [];
  posts: any[] = [];

  // Select All checkbox
  selectAll: boolean = false;

  // Check Action button when checkbox is true
  checkboxChecked: boolean = false;

  //Read more
  isReadMore: { [key: string]: boolean } = {};

  selectedIds: number[] = [];

  p: number = 1;
  itemsPerPage: number = 10;
  availableItemsPerPage: number[] = [10, 20, 30, 50];

  faPlusSquare = faPlusSquare;
  faSliders = faSliders;
  faEllipsisV = faEllipsisV;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;

  constructor(private apiService: ApiService, private router: Router) {
    library.add(faSliders, faPlusSquare, faEllipsisV, faEdit, faTrash, faEye);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.apiService.fetchData().subscribe(
      response => {
        console.log('API Response:', response); // Debug the response structure
        this.responseData = response.data;
        this.posts = this.responseData.map((post) => ({ ...post, selected: false }));

        console.log('API post:', this.posts);
        if (Array.isArray(response)) {
          this.responseData = response;
          this.posts = this.responseData.map((post) => ({ ...post, selected: false }));
        } else {
          this.responseData = [];
        }
      },
      error => {
        console.error('Failed to fetch data:', error);
      }
    );
  }

  viewDetails(postId: number): void {
    this.apiService.getPostDetails(postId).subscribe({
      next: (post) => {
        this.router.navigate(['/detail-post', postId], { state: { data: post.data } });
      },
      error: (error) => {
        console.error('Failed to fetch post details:', error);
        alert('Failed to fetch post details');
      }
    });
  };

  ngDoCheck(): void {}

  isAnyPostSelected(): boolean {
    return this.posts.some(post => post.selected === true);
  }

  toggleReadMore(event: Event, postId: string) {
    event.preventDefault();
    this.isReadMore[postId] = !this.isReadMore[postId];
  }

  checkAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.posts.forEach((post) => {
      post.selected = checked;
    });
    this.selectAll = checked;
  }

  updateSelectAllState() {
    this.selectAll = this.posts.every((post) => post.selected);
  }

  showModal(modalId: string, ids?: number[]) {
    const modal = document.getElementById(modalId);
    if (modal) {
      if (!ids) ids = this.getSelectedPostIds();
      this.selectedIds = ids;
      modal.style.display = 'block';
    }
  }

  getSelectedPostIds(): number[] {
    this.selectedIds = this.posts.filter(post => post.selected).map(post => post.id);
    return this.selectedIds;
  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = event.target.value;
    this.p = 1;
  }

  deletePost(index: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.posts.splice(index, 1);
    }
  }
}
