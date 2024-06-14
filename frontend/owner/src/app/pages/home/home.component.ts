import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faSliders, faGear, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faSliders = faSliders;
  faGear = faGear;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;




  posts: any[] = [
    { 
      title: '1. Đại tướng Tô Lâm làm Chủ tịch nước',
      content: 'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Hidden'
    },
    { 
      title: '2. Đại tướng Tô Lâm làm Chủ tịch nước',
      content: 'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional'
    },
    { 
      title: '2. Đại tướng Tô Lâm làm Chủ tịch nước',
      content: 'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional'
    },
    { 
      title: '2. Đại tướng Tô Lâm làm Chủ tịch nước',
      content: 'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional'
    },
    { 
      title: '2. Đại tướng Tô Lâm làm Chủ tịch nước',
      content: 'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional'
    },
    
    { 
      title: '3. Đại tướng Tô Lâm làm Chủ tịch nước',
      content: 'Sáng 22/5, 472/473 đại biểu có mặt thông qua nghị quyết bầu đại tướng Tô Lâm giữ chức Chủ tịch nước nhiệm kỳ 2021-2026. Đúng 9h, tân Chủ tịch nước Tô Lâm bước lên bục thực hiện nghi lễ tuyên thệ...',
      date: '04/06/2023',
      category: 'News',
      language: 'vi-VI',
      status: 'Professional'
    }
    // Add more posts as needed
  ];

  constructor() {
    library.add(faSliders, faPlusSquare, faGear, faEdit, faTrash, faEye);
  }

  ngOnInit(): void {
    // Initialization code here if needed
  }

  showModal() {
    // Function to show modal for delete confirmation
    // Implement your logic here
  }

  deletePost(index: number) {
    // Function to delete a post
    // This function can be called from the template to delete a specific post
    // Implement your delete logic here
    if (confirm('Are you sure you want to delete this post?')) {
      this.posts.splice(index, 1);
    }
  }
}


