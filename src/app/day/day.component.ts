import { Component, Input } from '@angular/core';
import { Event } from '../core/models/event.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent {
  @Input() day!: string;
  @Input() dayIndex: number;
  @Input() events!: Event[];
  @Input() addEvent!: (dayIndex: number, event: Event) => void;
  @Input() clearDay!: (dayIndex: number) => void;
  @Input() changeEvent!: (dayIndex: number, event: Event[]) => void;
  @Input() removeEvent!: (dayIndex: number, event: Event[]) => void;

  drop(event: CdkDragDrop<Event[]>) {
    moveItemInArray(this.events, event.previousIndex, event.currentIndex);
    this.changeEvent(this.dayIndex, this.events);
  }

  handleremoveEvent(index: number) {
    this.events.splice(index, 1);
    this.removeEvent(this.dayIndex, this.events);
  }
}
