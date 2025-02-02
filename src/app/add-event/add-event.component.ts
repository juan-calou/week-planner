import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../core/models/event.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BaseForm } from '../core/base-form/base-form';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent extends BaseForm implements OnInit {
  @Input() showDaySelector: boolean = true;
  @Input() dayIndex: number = -1;
  @Input() addEvent!: (dayIndex: number, event: Event) => void;

  newEvent: Event = { dayIndex: 0, name: '', category: 'personal', time: '' };

  constructor(private formBuilder: UntypedFormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  buildForm() {
    return this.formBuilder.group({
      eventDay: [0, [Validators.required]],
      eventName: ['', [Validators.required]],
      eventTime: ['', [Validators.required]],
      eventCategory: ['', [Validators.required]],
    });
  }

  getFormResetValue() {
    return {
      eventDay: 0,
      eventName: '',
      eventTime: '',
      eventCategory: '',
    };
  }

  addNewEvent() {
    if (
      this.newEvent.name &&
      this.newEvent.time &&
      this.newEvent.dayIndex &&
      this.newEvent.category
    ) {
      this.addEvent(this.newEvent.dayIndex, { ...this.newEvent });
    }
  }

  resetEvent() {
    this.newEvent = { dayIndex: 0, name: '', category: 'personal', time: '' };
  }

  submit() {
    this.disableForm();
    let dayIndex = this.dayIndex;
    if (this.showDaySelector) {
      dayIndex = this.form.get('eventDay').value;
    }
    this.resetEvent();
    this.newEvent = {
      dayIndex,
      name: this.form.get('eventName').value,
      time: this.form.get('eventTime').value,
      category: this.form.get('eventCategory').value,
    };
    this.addNewEvent();
    this.reEnableForm();
    this.resetForm();
  }
}
