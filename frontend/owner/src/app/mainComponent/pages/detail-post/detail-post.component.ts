import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { format } from 'date-fns';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
    if (!this.post) {
      const postId = this.route.snapshot.paramMap.get('id');
      if (postId) {
        this.apiService.getPostDetails(Number(postId)).subscribe((post) => {
          this.post = post.data;
        });
      }
    }
    this.getData();
  };

  getSanitizedHtml(body: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(body);
  }

  getData(Keyword: string = '', page: number = this.currentPage, perPage: number = this.itemsPerPage): void {
    this.apiService.getData(Keyword, page, perPage).subscribe((response) => {
      this.responseData = response.data.posts;
      this.posts = this.responseData.map((post) => ({
        ...post,
        selected: false,
        formattedDate: format(new Date(post.createdAt), 'PP')
      }));
    });
  };

  viewDetails(postId: number): void {
    this.apiService.getPostDetails(postId).subscribe((post) => {
      this.router.navigate(['/detail-post', postId], { state: { data: post.data } });
      window.location.href = `/detail-post/${postId}`;
    });
  };
}
