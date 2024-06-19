import { Component, ComponentFactoryResolver, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faSliders, faGear, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, DoCheck {
  // @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer: ViewContainerRef;

  // Select All checkbox
  selectAll: boolean = false;

  // Check Action button when checkbox is true
  checkboxChecked: boolean = false;

  //Read more
  isReadMore: { [key: string]: boolean } = {};

  selectedIds: number[] = [];

  p: number = 1;
  itemsPerPage: number = 10;
  availableItemsPerPage: number[] = [10, 20, 30, 50];

  faPlusSquare = faPlusSquare;
  faSliders = faSliders;
  faGear = faGear;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;

  posts: any[] = [
    {
      id: 1,
      title: '1. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Hidden',
    },
    {
      id: 2,
      title: '2. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 3,
      title: '3. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 4,
      title: '4. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 5,
      title: '5. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 6,
      title: '6. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 7,
      title: '7. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 8,
      title: '8. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 9,
      title: '9. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 10,
      title: '10. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 11,
      title: '11. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 12,
      title: '12. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 13,
      title: '13. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 14,
      title: '14. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 15,
      title: '15. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 16,
      title: '16. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 17,
      title: '17. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 18,
      title: '18. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 19,
      title: '19. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 20,
      title: '20. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 21,
      title: '21. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },

    {
      id: 22,
      title: '22. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 23,
      title: '23. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      id: 24,
      title: '24. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },

    // Add more posts as needed
  ];

  constructor() {
    library.add(faSliders, faPlusSquare, faGear, faEdit, faTrash, faEye);
  }

  ngOnInit(): void {
    this.posts = this.posts.map((post) => ({ ...post, selected: false }));
  }

  ngDoCheck(): void {}

  isAnyPostSelected(): boolean {
    return this.posts.some(post => post.selected === true);
  }

  toggleReadMore(event: Event, postId: string) {
    event.preventDefault();
    this.isReadMore[postId] = !this.isReadMore[postId];
  }

  checkAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.posts.forEach((post) => {
      post.selected = checked;
    });
    this.selectAll = checked;
  }

  updateSelectAllState() {
    this.selectAll = this.posts.every((post) => post.selected);
  }

  showModal(modalId: string, ids?: number[]) {
    const modal = document.getElementById(modalId);
    if (modal) {
      if (!ids) ids = this.getSelectedPostIds();
      this.selectedIds = ids;
      modal.style.display = 'block';
    }
  }
  
  getSelectedPostIds(): number[] {
    this.selectedIds = this.posts.filter(post => post.selected).map(post => post.id);
    return this.selectedIds;
  }
  
  onItemsPerPageChange(event: any) {
    this.itemsPerPage = event.target.value;
    this.p = 1;
  }

  deletePost(index: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.posts.splice(index, 1);
    }
  }
}
