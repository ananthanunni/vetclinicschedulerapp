import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConstants } from '../../../AppConstants';
import { Appointment, Slot } from '../../services/appointments.service';

@Component({
  selector: 'appointments-time-slot-picker',
  templateUrl: './time-slot-picker.component.html',
  styleUrls: ['./time-slot-picker.component.css']
})
export class TimeSlotPickerComponent implements OnInit {
  constructor() { }

  @Input("date")
  date: Date;

  @Input("appointments")
  appointments: Appointment[];

  @Input("group")
  group: FormGroup;

  @Input("fromControlName")
  fromControlName: string;

  @Input("toControlName")
  toControlName: string;

  selectedSlots: Slot[] = [];

  ngOnInit(): void {

  }

  onSelectedSlotsChanged(slots: Slot[]) {
    let first = slots?.length > 0 ? slots[0] : null;
    this.group.get(this.fromControlName).setValue(first?.start);

    let last = slots.length > 0 ? slots[slots.length - 1] : first;
    let lastDateTime: Date = null;
    if (!!last) {
      lastDateTime = new Date(last.start);
      lastDateTime.setMinutes(lastDateTime.getMinutes() + AppConstants.slotDurationInMinutes);
    }

    this.group.get(this.toControlName).setValue(lastDateTime);
  }
}
