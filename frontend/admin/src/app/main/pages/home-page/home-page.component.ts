import { Component, inject, OnInit } from '@angular/core';
import { ToastsService } from '../../features/toasts/toasts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {

  toastService = inject(ToastsService)

  ngOnInit(): void {
    this.loadToast()
  }

  loadToast() {
    const template = localStorage.getItem('template')
    const classname = localStorage.getItem('classname')
    const delay = localStorage.getItem('delay')
    if (template && classname && delay) {
      this.toastService.show({template, classname, delay: Number(delay)});
      localStorage.removeItem('template')
      localStorage.removeItem('classname')
      localStorage.removeItem('delay')
    }
  }

}
