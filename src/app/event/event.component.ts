import { Component, Input } from '@angular/core';
import { Event } from '../core/models/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent {
  @Input() event!: Event;
  @Input() dayIndex: number;
  @Input() eventIndex: number;
  @Input() removeEvent!: (index) => void;
}
