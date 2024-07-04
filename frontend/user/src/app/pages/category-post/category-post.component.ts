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

  getCategoryPosts(categoryId: number): void {
    this.apiService.getPostCategories(categoryId).subscribe((response) => {
        this.posts = response.data;
    });
  }
}
