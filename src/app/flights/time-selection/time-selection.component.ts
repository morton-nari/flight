import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'pm-time-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './time-selection.component.html',
  styleUrls: ['./time-selection.component.css']
})
export class TimeSelectionComponent {

  @Input() label: string = '';
  @Output() selectedTime = new EventEmitter<number>();

  selectedTimeValue: string = '';
  onTimeChange(selectedTime: string) {
  const time = moment(selectedTime, 'HH:mm');
  const midnight = time.clone().startOf('day');
  const minuteCount = time.diff(midnight, 'minutes');
  this.selectedTime.emit(minuteCount);
  }

}
