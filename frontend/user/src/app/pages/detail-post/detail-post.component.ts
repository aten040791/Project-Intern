import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit{
  reponseDataPosts: any[] = [];
  reponDataPostsHeader: any[] = [];
  reponDataPostsFooter: any[] = [];
  post: any;
  responseDataCategory: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.post = navigation.extras.state['post'];
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = +params['id'];
      if (postId) {
        this.fetchPostDetails(postId);
      }
    });

    this.fetchDataCategory();
    this.fetchData();
  };

  fetchData(): void {
    this.apiService.fetchData().subscribe({
      next: (response) => {
        console.log('API Response - Posts:', response);
        this.reponseDataPosts = response.data;
        this.reponDataPostsHeader = response.data.slice(0, 3);
        this.reponDataPostsFooter = response.data.slice(0, 10);
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
      },
    });
  };

  fetchDataCategory(): void {
    this.apiService.fetchDataCategory().subscribe({
      next: response => {
        console.log('API Response - Categories:', response.data);
        if (Array.isArray(response.data)) {
          this.responseDataCategory = response.data;
        } else {
          this.responseDataCategory = [];
        }
      },
      error: error => {
        console.error('Failed to fetch categories:', error);
      }
    });
  };

  fetchPostDetails(postId: number): void {
    this.apiService.getPostDetails(postId).subscribe({
      next: (response) => {
        console.log('API Response - Post Details:', response);
        this.post = response.data;
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
      }
    });
  }

  getSanitizedHtml(body: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(body);
  }

}
