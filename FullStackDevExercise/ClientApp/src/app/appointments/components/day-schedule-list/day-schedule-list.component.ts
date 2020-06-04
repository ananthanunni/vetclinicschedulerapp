import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { DialogService } from '../../../shared-core/services/dialog.service';
import { Appointment, AppointmentsService, Slot } from '../../services/appointments.service';
import { DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'appointments-day-schedule-list',
  templateUrl: './day-schedule-list.component.html',
  styleUrls: ['./day-schedule-list.component.css']
})
export class DayScheduleListComponent implements OnInit, OnChanges {
  isLoading = false;
  hours: Hour[];
  slots: ScheduleSlot[];

  selectedAppointmentId: number;

  @Input("isSlotPickerMode")
  isSlotPickerMode = false;

  @Input("appointments")
  appointments: Appointment[];

  @Output("appointmentsChange")
  appointmentsChange = new EventEmitter<Appointment[]>();

  @Output("onAppointmentSelected")
  onAppointmentSelected = new EventEmitter<number>();

  @Input("selectedSlots")
  selectedSlots: Slot[] = [];

  @Output("selectedSlotsChange")
  selectedSlotsChange = new EventEmitter<Slot[]>();

  @Input("date")
  selectedDate: Date;

  constructor(private dateTimeService: DateTimeService, private dialogService: DialogService, private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges) {
    let dateChange: SimpleChange = changes["selectedDate"];
    if (dateChange != null)
      this.loadData();
  }

  onAppointmentClicked(appointment: Appointment) {
    if (!appointment || this.selectedAppointmentId === appointment.id) return;

    this.selectedAppointmentId = appointment.id;

    this.onAppointmentSelected.emit(this.selectedAppointmentId);
  }

  onSlotClicked(slot: ScheduleSlot) {
    if (!slot.isBlocked) {
      this.blockSlot(slot);
    }
    else {
      this.unblockSlot(slot);
    }

    this.selectedSlotsChange.emit(this.selectedSlots);
  }

  private blockSlot(slot: ScheduleSlot) {
    if (!this.canBlockSlot(slot, true)) return;
    slot.isBlocked = true;

    this.selectedSlots.push(slot);
    this.selectedSlots = this.selectedSlots.sort((r1, r2) => r1.start > r2.start ? 1 : -1);
  }

  private unblockSlot(slot: ScheduleSlot) {
    if (!this.canUnblockSlot(slot)) return;
    slot.isBlocked = false;

    this.selectedSlots.splice(this.selectedSlots.indexOf(slot), 1);
  }

  canUnblockSlot(slot: ScheduleSlot) {
    let index = this.selectedSlots.indexOf(slot);
    return index === 0 || index === this.selectedSlots.length - 1;
  }

  canBlockSlot(slot: ScheduleSlot, showReason = false) {
    if (slot.appointment || slot.isInactive || slot.isBlocked) return false;
    if (slot.start < new Date()) {
      if (showReason) this.dialogService.showToast("Can't block a time slot in the past.", "warning");
      return false;
    }

    if (this.selectedSlots?.length === 0) return true;

    let slotIndex = this.slots.indexOf(slot);
    if (slotIndex === 0) return true;

    let prevBlock = this.slots[slotIndex - 1];
    if (prevBlock.isBlocked) return true;

    if (slotIndex < this.slots.length - 1) {
      let nextBlock = this.slots[slotIndex + 1];
      if (nextBlock.isBlocked) return true;
    }

    return false;
  }

  toSlotTimeDisplay(slot: ScheduleSlot) { return this.dateTimeService.toFriendlyTimeDisplay(slot.start, false); }

  isLinkedToPrevious(slot: ScheduleSlot) {
    if (!slot.appointment) return false;

    let itemIndex = this.slots.indexOf(slot);

    if (itemIndex === 0) return false;

    if (this.slots[itemIndex - 1].appointment == slot.appointment) return true;

    return false;
  }

  blockLeadTextDisplay(hour: Hour) { return this.dateTimeService.toFriendlyTimeDisplay(hour.slots[0].start, false, false); }

  private initialize() {
    let slots = this.appointmentService.getSlotsForDay(new Date(this.selectedDate));

    this.hours = slots
      .map(r => r.start.getHours()).filter((value, index, self) => self.indexOf(value) === index)
      .map(r => new Hour(slots.filter(slot => slot.isInHour(r))));

    this.slots = slots;
  }

  private loadData() {
    this.initialize();

    this.selectedAppointmentId = null;
    this.isLoading = true;
    this.appointmentService.getAppointmentsForDate(this.selectedDate)
      .subscribe(
        r => {
          this.appointments = r || [];

          for (let app of this.appointments) {
            let slots = this.slots.filter(s => {
              return s.start.getTime() >= app.slotFrom.getTime() && s.start.getTime() < app.slotTo.getTime();
            });

            for (let s of slots) {
              s.appointment = app;
            }
          }
        },
        e => {
          this.appointments = []
        },
        () => {
          this.isLoading = false;
          this.appointmentsChange.emit(this.appointments);
        }
      );
  }
}

class Hour {
  constructor(public slots: ScheduleSlot[]) { }
}

class ScheduleSlot extends Slot {
  constructor(start: Date, durationInMinutes: number, public inactiveReason: "outofoffice" | "break" = null) {
    super(start, durationInMinutes);
  }

  isInHour(hour: number) {
    return this.start.getHours() === hour;
  }

  appointment: Appointment;

  isBlocked: boolean;

  get isInactive() { return !!this.inactiveReason; }
}
