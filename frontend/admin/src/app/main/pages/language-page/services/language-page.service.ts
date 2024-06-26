import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagePageService {
  item: any = {}
  constructor() { }

  setItem(item: any) {
    this.item = item
    this.item.nameApi = "languages"
  }

  getItem():void {
    return this.item
  }

}
