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
  post: any;
  formattedDate: any;
  reponsePosts: any[] = [];
  reponseDataPosts: any[] = [];
  reponDataPostsHeader: any[] = [];
  reponDataPostsFooter: any[] = [];
  responseDataCategory: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) { }

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

  getTranslationData(translations: any[]): { title: string, body: SafeHtml, languageName: string } {
    let title = 'No title available';
    let body: SafeHtml = this.sanitizer.bypassSecurityTrustHtml('<p>No content available</p>');
    let languageName = 'No language available';
  
    if (translations.length > 0) {
      for (let i = 0; i < translations.length; i++) {
        if(translations[i].title && title === 'No title available') title = translations[i].title;
        if(translations[i].body) body = this.sanitizer.bypassSecurityTrustHtml(translations[i].body);
        if(translations[i].language && translations[i].language.name &&
          languageName === 'No language available' &&
          title !== 'No title available') {
          languageName = translations[i].language.name; }
          if(title !== 'No title available' && body !== this.sanitizer.bypassSecurityTrustHtml('<p>No content available</p>') && languageName !== 'No language available') {
            break;
          }
      }
    }
    return { title, body, languageName };
  };

  getData(): void {
    this.apiService.getData().subscribe((response) => {
        this.reponsePosts = response.data;
        this.reponDataPostsHeader = response.data.slice(0, 3);
        this.reponDataPostsFooter = response.data.slice(0, 10);
        this.reponseDataPosts = this.reponsePosts.map((post) => ({
          ...post,
          formattedDate: format(new Date(post.createdAt), 'PP'),
        }));
    });
  };

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe((response) => {
      this.responseDataCategory = response.data;
    });
  };

  getPostDetails(postId: number): void {
    this.apiService.getPostDetails(postId).subscribe((response) => {
      this.post = response.data;
      this.formattedDate = format(new Date(response.data.createdAt), 'PP');
    });
  }

  getSanitizedHtml(body: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(body);
  }

}
