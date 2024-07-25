import { state } from '@angular/animations';
import { Component, OnInit, DoCheck, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faSliders, faEllipsisV, faEdit, faEye, faTrash, faLanguage, faBook, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { format } from 'date-fns';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslationService } from '../../shared/i18n/translation.service';
import { ToastsService } from '../../featrue/toasts/toasts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, DoCheck {
  faPlusSquare = faPlusSquare;
  faSliders = faSliders;
  faEllipsisV = faEllipsisV;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;
  faLanguage = faLanguage;
  faBook = faBook;
  faToggleOn = faToggleOn;

  posts: any[] = [];
  currentPage: number = 1;
  totalPosts: number = 0;
  totalPages: number = 0;
  itemsPerPage: number = 10;
  availableItemsPerPage: number[] = [10, 20, 30, 50];
  searchTerm: string = '';
  responseData: any[] = [];
  selectedIds: number[] = [];
  selectAll: boolean = false;
  checkboxChecked: boolean = false;
  isReadMore: { [key: string]: boolean } = {};
  locale: string = '';

  toastService = inject(ToastsService)

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private translate: TranslationService) {
    library.add(
      faSliders, faPlusSquare, faEllipsisV, faEdit,
      faTrash, faEye, faLanguage, faBook, faToggleOn
    );

  };

  ngOnInit(): void {
    this.locale = localStorage.getItem('locale') || 'en';
    this.translate.setDefaultLang(this.locale);
    this.updateUrl();
    this.getData();
    this.loadToast();
  };

  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
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
          languageName = translations[i].language.flag; }
        if(title !== 'No title available' && body !== this.sanitizer.bypassSecurityTrustHtml('<p>No content available</p>') && languageName !== 'No language available') {
          break;
        }
      }
    }
    return { title, body, languageName };
  };

  getData(Keyword: string = '', page: number = this.currentPage, perPage: number = this.itemsPerPage ): void {
    this.apiService.getData(Keyword, page, perPage).subscribe((response) => {
      this.responseData = response.data.posts;
      this.posts = this.responseData.map((post) => ({
        ...post,
        selected: false,
        formattedDate: format(new Date(post.createdAt), 'PP'),
      }));
      this.totalPages = response.data.totalPages;
      this.totalPosts = response.data.totalPosts;
    });
  };

  onItemsPerPageChange(event: any): void {
    this.itemsPerPage = event.target.value;
    this.currentPage = 1;
    this.updateUrl();
    this.getData(this.searchTerm, this.currentPage, this.itemsPerPage);
  };

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log('currentPage', this.currentPage);
    this.updateUrl();
    this.getData(this.searchTerm, this.currentPage, this.itemsPerPage);
  };
  

  search(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.updateUrl();
    this.getData(this.searchTerm, this.currentPage, this.itemsPerPage);
  };

  private updateUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        keyword: this.searchTerm,
        page: this.currentPage,
        perPage: this.itemsPerPage,
      },
      queryParamsHandling: 'merge',
    });
  };

  ngDoCheck(): void {};

  isAnyPostSelected(): boolean {
    return this.posts.some((post) => post.selected === true);
  };

  toggleReadMore(event: Event, postId: string) {
    event.preventDefault();
    this.isReadMore[postId] = !this.isReadMore[postId];
  };

  checkAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.posts.forEach((post) => {
      post.selected = checked;
    });
    this.selectAll = checked;
  };

  updateSelectAllState() {
    this.selectAll = this.posts.every((post) => post.selected);
  };

  showModal(modalId: string, ids?: number[]) {
    const modal = document.getElementById(modalId);
    if (modal) {
      if (!ids) ids = this.getSelectedPostIds();
      this.selectedIds = ids;
      modal.style.display = 'block';
    }
  };

  getSelectedPostIds(): number[] {
    this.selectedIds = this.posts
      .filter((post) => post.selected)
      .map((post) => post.id);
    return this.selectedIds;
  };

  shouldShowReadMore(body: string): boolean {
    const maxLength = 200;
    return body.length > maxLength;
  };
  
  loadToast() {
    const template = localStorage.getItem('template');
    const classname = localStorage.getItem('classname');
    const delay = localStorage.getItem('delay');
    const msg = localStorage.getItem('msg') || "";
    if (template && classname && delay) {
      this.toastService.show({template, msg, classname, delay: Number(delay)});
      localStorage.removeItem('template');
      localStorage.removeItem('classname');
      localStorage.removeItem('delay');
      localStorage.removeItem('msg');
    }
  };
}
