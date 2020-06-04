import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogService } from '../../../shared-core/services/dialog.service';
import { StorageService } from '../../../shared-core/services/storage.service';
import { AppointmentEditorDialogService } from '../../services/appointment-editor-dialog.service';
import { Appointment, AppointmentsService, MonthlySummaryItem, Slot } from '../../services/appointments.service';
import { DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedDate: Date;
  monthlySummary: MonthlySummaryItem[];
  isLoadingSummary: boolean;
  private readonly lastViewedDateKey = "lastViewedDate";

  appointments: Appointment[];
  appointmentId: number;

  isCreateNewAppointment = false;

  freeSlots: Slot[];
  formGroup = new FormGroup({
    "slotFrom": new FormControl(null, [Validators.required]),
    "slotTo":new FormControl(null, Validators.required)
  });

  constructor(
    private appointmentsService: AppointmentsService,
    private dialogService: DialogService,
    private appointmentDialogService: AppointmentEditorDialogService,
    private dateTimeService: DateTimeService,
    private storageService:StorageService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    let lastViewedDateValue = this.storageService.getValue(this.lastViewedDateKey);
    this.selectedDate = lastViewedDateValue?new Date(lastViewedDateValue): new Date();
  }

  onAppointmentSelected(appointmentId: number) {
    this.appointmentId = appointmentId;
    this.isCreateNewAppointment = !appointmentId;
  }

  onSelectedDateChange(date: Date) {
    this.appointmentId = null;
    this.storageService.setValue(this.lastViewedDateKey, date.toISOString());
  }

  beginAppointmentCreation() {
    let freeSlots = this.appointmentsService.getSlotsForDay(this.selectedDate)?.filter(r => !r.isInactive && this.appointments.findIndex(a => this.dateTimeService.isWithinTimePeriod(r.start, a.slotFrom, a.slotTo)));
    this.freeSlots = freeSlots;

    this.appointmentDialogService.saveAppointment(
      new Appointment(),
      freeSlots,
      this.appointments,
      this.selectedDate
    )
      .subscribe(r => {
        if (!r) return;

        debugger;

        // Force refresh
        let date = new Date(this.selectedDate);
        this.selectedDate = null;
        this.selectedDate = date;

        this.onMonthChanged({month:this.selectedDate.getMonth(), year:this.selectedDate.getFullYear()});
      });
  }

  onMonthChanged(month: { year: number, month: number }) {
    this.isLoadingSummary = true;
    this.appointmentsService.getSummaryForMonth(month.year, month.month)
      .subscribe(
        r => this.monthlySummary = r,
        e => this.dialogService.showToast(`Error loading monthly summary.`, "error"),
        () => this.isLoadingSummary = false
      );
  }

  get selectedDateDisplay() {
    let dateString = this.dateTimeService.toFriendlyDateDisplay(this.selectedDate);

    let today = new Date();
    return this.sanitizer.bypassSecurityTrustHtml(
      today.toDateString() === this.selectedDate.toDateString() ? `Today, <small>${dateString}</small>` : dateString
    );
  }
}
