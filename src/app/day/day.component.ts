import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../core/models/event.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BaseForm } from '../core/base-form/base-form';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent extends BaseForm implements OnInit {
  @Input() day!: string;
  @Input() dayIndex: number;
  @Input() events!: Event[];
  @Input() addEvent!: (dayIndex: number, event: Event) => void;
  @Input() clearDay!: (dayIndex: number) => void;
  @Input() changeEvent!: (dayIndex: number, event: Event[]) => void;
  @Input() removeEvent!: (dayIndex: number, event: Event[]) => void;

  newEvent: Event = { dayIndex: 0, name: '', category: 'personal', time: '' };

  constructor(private formBuilder: UntypedFormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  drop(event: CdkDragDrop<Event[]>) {
    moveItemInArray(this.events, event.previousIndex, event.currentIndex);
    this.changeEvent(this.dayIndex, this.events);
  }

  handleremoveEvent(index: number) {
    this.events.splice(index, 1);
    this.removeEvent(this.dayIndex, this.events);
  }

  addNewEvent() {
    if (this.newEvent.name && this.newEvent.time) {
      this.addEvent(this.dayIndex, { ...this.newEvent });
      this.resetEvent();
    }
  }

  buildForm() {
    return this.formBuilder.group({
      eventName: ['', [Validators.required]],
      eventTime: ['', [Validators.required]],
      eventCategory: ['', [Validators.required]],
    });
  }

  getFormResetValue() {
    return {
      eventName: '',
      eventTime: '',
      eventCategory: '',
    };
  }

  resetEvent() {
    this.newEvent = { dayIndex: 0, name: '', category: 'personal', time: '' };
  }

  submit() {
    this.formPending = true;
    this.resetEvent();
    this.newEvent = {
      dayIndex: this.dayIndex,
      name: this.form.get('eventName').value,
      time: this.form.get('eventTime').value,
      category: this.form.get('eventCategory').value,
    };
    this.addNewEvent();
    this.formPending = false;
  }
}
