import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-post',
  templateUrl: './category-post.component.html',
  styleUrls: ['./category-post.component.css']
})
export class CategoryPostComponent implements OnInit {
  responseData: any[] = [];
  posts: any[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    console.log(categoryId);
    if (categoryId) {
      this.fetchCategoryPosts(Number(categoryId));
    }
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
