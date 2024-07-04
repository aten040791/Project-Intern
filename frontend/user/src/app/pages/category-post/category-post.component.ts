import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-category-post',
  templateUrl: './category-post.component.html',
  styleUrls: ['./category-post.component.css']
})
export class CategoryPostComponent implements OnInit {
  reponseDataPosts: any[] = [];
  posts: any[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = +params['id'];
      if (categoryId) {
        this.fetchCategoryPosts(categoryId);
      }
    });

    this.fetchData();
  };

  fetchData(): void {
    this.apiService.fetchData().subscribe({
      next: (response) => {
        console.log('API Response - Posts:', response);
        this.reponseDataPosts = response.data;
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
      },
    });
  };

  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  fetchCategoryPosts(categoryId: number): void {
    this.apiService.getPostCategories(categoryId).subscribe({
      next: (response) => {
        console.log('API Response category:', response);
        this.posts = response.data;
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
      }
    });
  }
}
