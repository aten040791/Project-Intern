import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit{
  responseData: any[] = [];
  posts: any[] = [];
  post: any;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.post = navigation.extras.state['post'];
    }
  }

  ngOnInit(): void {
    this.fetchData();
    if (!this.post) {
      const postId = this.route.snapshot.paramMap.get('id');
      if (postId) {
        this.apiService.getPostDetails(Number(postId)).subscribe((post) => this.post = post);
      }
    }
  };

  fetchData(): void {
    this.apiService.fetchData().subscribe(
      response => {
        console.log('API Response:', response); // Debug the response structure
  
        this.responseData = response.data;
        this.posts = this.responseData.map((post) => ({
          ...post,
          selected: false,
          formattedDate: format(new Date(post.createdAt), 'PP') // Format the date here
        }));
  
        console.log('API post:', this.posts);
        if (Array.isArray(response)) {
          this.responseData = response;
          this.posts = this.responseData.map((post) => ({
            ...post,
            selected: false,
            formattedDate: format(new Date(post.createdAt), 'PP') // Format the date here
          }));
        } else {
          this.responseData = [];
        }
      },
      error => {
        console.error('Failed to fetch data:', error);
      }
    );
  };

  viewDetails(postId: number): void {
    this.apiService.getPostDetails(postId).subscribe({
      next: (post) => {
        this.router.navigate(['/detail-post', postId], { state: { data: post.data } });
        window.location.href = `/detail-post/${postId}`;
      },
      error: (error) => {
        console.error('Failed to fetch post details:', error);
        alert('Failed to fetch post details');
      }
    });
  };
}
