import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit{
  post: any;

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
        this.apiService.getPostDetails(Number(postId)).subscribe((post) => this.post = post);
      }
    }
  }
}
