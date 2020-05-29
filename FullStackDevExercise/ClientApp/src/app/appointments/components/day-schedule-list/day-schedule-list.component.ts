import { Component, Input, OnChanges, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DateTimeService } from '../../services/date-time.service';
import { AppointmentsService, Appointment } from '../../services/appointments.service';

@Component({
  selector: 'appointments-day-schedule-list',
  templateUrl: './day-schedule-list.component.html',
  styleUrls: ['./day-schedule-list.component.css']
})
export class DayScheduleListComponent implements OnInit, OnChanges {
  appointments: Appointment[];
  isLoading = false;

  constructor(private dateTimeService: DateTimeService, private sanitizer: DomSanitizer, private appointmentService: AppointmentsService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    let dateChange: SimpleChange = changes["selectedDate"];
    if (dateChange != null)
      this.loadData();
  }

  @Input("date")
  selectedDate: Date;

  loadData() {
    this.isLoading = true;
    this.appointmentService.getAppointmentsForDate(this.selectedDate)
      .subscribe(
        r => this.appointments = r,
        e => {
          this.appointments = []
        },
        () => this.isLoading = false
      );
  }

  get selectedDateDisplay() { return this.sanitizer.bypassSecurityTrustHtml(this.dateTimeService.toFriendlyDateDisplay(this.selectedDate)); }
}
