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

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.post = navigation.extras.state['post'];
    }
  }

  ngOnInit(): void {
    if (!this.post) {
      const postId = this.route.snapshot.paramMap.get('id');
      if (postId) {
        this.apiService.getPostDetails(Number(postId)).subscribe((post) => {
          this.post = post.data;
        });
      }
    }
    this.fetchData();
  };

  fetchData(Keyword: string = '', page: number = this.currentPage, perPage: number = this.itemsPerPage): void {
    this.apiService.fetchData(Keyword, page, perPage).subscribe({
      next: (response) => {
        console.log('API Response:', response);
    
        this.responseData = response.data.posts;
        this.posts = this.responseData.map((post) => ({
          ...post,
          selected: false,
          formattedDate: format(new Date(post.createdAt), 'PP')
        }));
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
      }
    });
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
