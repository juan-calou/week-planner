import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private STORAGE_KEY = 'weekPlannerEvents';

  getEvents(): Event[][] {
    try {
      if (typeof localStorage === 'undefined') {
        console.warn('Local storage is not available in this environment.');
        return this.createEmptyWeek();
      }
      const storedEvents = localStorage.getItem(this.STORAGE_KEY);
      return storedEvents ? JSON.parse(storedEvents) : this.createEmptyWeek();
    } catch (error) {
      console.error('Error reading from local storage:', error);
      return this.createEmptyWeek();
    }
  }

  saveEvents(events: Event[][]): void {
    try {
      if (typeof localStorage === 'undefined') {
        console.warn('Local storage is not available in this environment.');
        return;
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }

  clearEvents(): void {
    try {
      if (typeof localStorage === 'undefined') {
        console.warn('Local storage is not available in this environment.');
        return;
      }
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('Local storage for weekPlannerEvents has been cleared.');
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  }

  private createEmptyWeek(): Event[][] {
    return Array.from({ length: 5 }, () => []);
  }
}
