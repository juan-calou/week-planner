import { Component } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public localStorageService: LocalStorageService) {}

  clearWeek() {
    this.localStorageService.clearEvents();
    window.location.reload();
  }
}
