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
        this.getPostDetails(postId);
      }
    });

    this.getDataCategory();
    this.getData();
  };

  getData(): void {
    this.apiService.getData().subscribe((response) => {
        console.log('API Response - Posts:', response);
        this.reponseDataPosts = response.data || [];
        this.reponDataPostsHeader = response.data.slice(0, 3) || [];
        this.reponDataPostsFooter = response.data.slice(0, 10) || [];
    });
  };

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe((response) => {
      this.responseDataCategory = response.data || [];
    });
  };

  getPostDetails(postId: number): void {
    this.apiService.getPostDetails(postId).subscribe((response) => {
      this.post = response.data || [];
    });
  }

  getSanitizedHtml(body: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(body);
  }

}
