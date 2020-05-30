import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConstants } from '../../../AppConstants';
import { Appointment, AppointmentsService } from '../../services/appointments.service';
import { DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'appointments-day-schedule-list',
  templateUrl: './day-schedule-list.component.html',
  styleUrls: ['./day-schedule-list.component.css']
})
export class DayScheduleListComponent implements OnInit, OnChanges {
  appointments: Appointment[];
  isLoading = false;
  hours: Hour[];
  slots: Slot[];

  constructor(private dateTimeService: DateTimeService, private sanitizer: DomSanitizer, private appointmentService: AppointmentsService) { }

  @Input("date")
  selectedDate: Date;

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges) {
    let dateChange: SimpleChange = changes["selectedDate"];
    if (dateChange != null)
      this.loadData();
  }

  private initialize() {
    let slots: Slot[] = [];
    let start = AppConstants.openHour;
    let end = AppConstants.closeHour;

    let today = new Date(this.selectedDate);
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth();
    let todayDate = today.getDate();

    let openEmptySlots = [...Array(~~((~~(AppConstants.openHour % 100)) / AppConstants.slotDurationInMinutes)).keys()].map(r => r * AppConstants.slotDurationInMinutes);
    for (let emptySlot of openEmptySlots)
      slots.push(new Slot(new Date(todayYear, todayMonth, todayDate, ~~(start / 100), emptySlot), AppConstants.slotDurationInMinutes, "outofoffice"));

    let slot = start;

    while (slot < end) {
      let slotStartDateTime = new Date(todayYear, todayMonth, todayDate, ~~(slot / 100), slot % 100);
      let newSlot = new Slot(
        slotStartDateTime,
        AppConstants.slotDurationInMinutes
      );

      if (AppConstants.breaks.findIndex(br => {
        let slotStartTime = (slotStartDateTime.getHours() * 100) + slotStartDateTime.getMinutes();

        return slotStartTime >= br.begin && slotStartTime < br.end;
      }) >= 0)
        newSlot.inactiveReason = "break";

      slots.push(newSlot);

      if ((slot + AppConstants.slotDurationInMinutes) % 100 >= 60)
        slot = ((~~(slot / 100)) + 1) * 100;
      else
        slot += AppConstants.slotDurationInMinutes;
    }

    if (end % 100 !== 0) {
      end = (~~(end / 100) * 100) + (60 - AppConstants.slotDurationInMinutes);
      for (; slot <= end; slot += AppConstants.slotDurationInMinutes)
        slots.push(new Slot(
          new Date(todayYear, todayMonth, todayDate, ~~(slot / 100), slot % 100),
          AppConstants.slotDurationInMinutes,
          "outofoffice"
        ));
    }

    this.hours = slots
      .map(r => r.start.getHours()).filter((value, index, self) => self.indexOf(value) === index)
      .map(r => new Hour(slots.filter(slot => slot.isInHour(r))));

    this.slots = slots;
  }

  toSlotTimeDisplay(slot: Slot) { return this.dateTimeService.toFriendlyTimeDisplay(slot.start, false); }

  isLinkedToPrevious(slot: Slot) {
    if (this.slots.indexOf(slot) === 0) return false;

    return true;
  }

  blockLeadTextDisplay(hour: Hour) { return this.dateTimeService.toFriendlyTimeDisplay(hour.slots[0].start, false, false); }

  loadData() {
    this.initialize();

    this.isLoading = true;
    this.appointmentService.getAppointmentsForDate(this.selectedDate)
      .subscribe(
        r => {
          this.appointments = r || [];

          for (let app of this.appointments) {
            let slots = this.slots.filter(s => s.start >= app.slotFrom && s.start < app.slotTo);

            for (let s of slots) {
              s.appointment = app;
            }
          }
        },
        e => {
          this.appointments = []
        },
        () => this.isLoading = false
      );
  }

  get selectedDateDisplay() { return this.sanitizer.bypassSecurityTrustHtml(this.dateTimeService.toFriendlyDateDisplay(this.selectedDate)); }
}

class Hour {
  constructor(public slots: Slot[]) { }
}

class Slot {
  constructor(public start: Date, public durationInMinutes: number, public inactiveReason: "outofoffice" | "break" = null) { }

  isInHour(hour: number) {
    return this.start.getHours() === hour;
  }

  appointment: Appointment;

  get isInactive() { return !!this.inactiveReason; }
}
