import { Component } from '@angular/core';
import { LocalStorageService } from './core/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'week-planner';

  constructor(public localStorageService: LocalStorageService) {}

  clearWeek() {
    this.localStorageService.clearEvents();
    window.location.reload();
  }
}
