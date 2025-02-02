import { Component, OnInit } from '@angular/core';
import { Event } from '../core/models/event.model';
import { LocalStorageService } from '../core/services/local-storage.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnInit {
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  events: Event[][] = [];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  addEvent(dayIndex: number, event: Event) {
    if (!this.events[dayIndex]) {
      this.events[dayIndex] = [];
    }
    this.events[dayIndex].push(event);
    this.saveEvents();
  }

  removeEvent(dayIndex: number, events: Event[]) {
    this.events[dayIndex] = events;
    this.saveEvents();
  }

  changeEvent(dayIndex: number, events: Event[]) {
    this.events[dayIndex] = events;
    this.saveEvents();
  }

  clearDay(dayIndex: number) {
    this.events[dayIndex] = [];
    this.saveEvents();
  }

  saveEvents() {
    this.localStorageService.saveEvents(this.events);
  }

  loadEvents() {
    this.events = this.localStorageService.getEvents();
  }
}
