import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faSliders, faGear, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectAll: boolean = false;
  checkboxChecked: boolean = false;

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
      title: '1. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Hidden',
    },
    {
      title: '2. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '3. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '4. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '5. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '6. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '7. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '8. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '9. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '10. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '11. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '12. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '13. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '14. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '15. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '16. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '17. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '18. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '19. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '20. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '21. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },

    {
      title: '22. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '23. Đại tướng Tô Lâm làm Chủ tịch nước',
      content:
        'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional',
    },
    {
      title: '17. Đại tướng Tô Lâm làm Chủ tịch nước',
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

  // checkCheckbox(event: Event) {
  //   this.checkboxChecked = this.posts.some(post => post.selected === true);
  // }

  showModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
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
