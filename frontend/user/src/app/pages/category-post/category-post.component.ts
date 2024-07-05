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

  currentPage: number = 1;
  totalPosts: number = 0;
  totalPages: number = 0;
  itemsPerPage: number = 10;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = +params['id'];
      if (categoryId) {
        this.getCategoryPosts(categoryId);
      }
    });

    this.getData();
  };

  getData(): void {
    this.apiService.getData().subscribe((response) => {
        this.reponseDataPosts = response.data;
    });
  };

  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.route.params.subscribe(params => {
      const categoryId = +params['id'];
      this.getCategoryPosts(categoryId, this.currentPage, this.itemsPerPage);
    });
  };

  getCategoryPosts(categoryId: number, page: number = this.currentPage, perPage: number = this.itemsPerPage): void {
    this.apiService.getPostCategories(categoryId, page, perPage).subscribe((response) => {
        this.posts = response.data.posts;
        this.totalPages = response.data.totalPages;
    });
  }
}
