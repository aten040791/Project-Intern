import { Component } from '@angular/core';
import { SelectAllService } from 'src/app/features/select-all/services/select-all.service';

@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.scss']
})
export class LanguagePageComponent {

  constructor(private selectAllService: SelectAllService) { }

  // from SelectAllService
  handleCheckBox(event: any): void {
    this.selectAllService.selectAll(event)
  }
  
}
