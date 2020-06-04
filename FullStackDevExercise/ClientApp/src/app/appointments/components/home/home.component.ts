import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogService } from '../../../shared-core/services/dialog.service';
import { StorageService } from '../../../shared-core/services/storage.service';
import { AppointmentEditorDialogService } from '../../services/appointment-editor-dialog.service';
import { Appointment, AppointmentsService, MonthlySummaryItem, Slot } from '../../services/appointments.service';
import { DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'appointments-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedDate: Date;
  monthlySummary: MonthlySummaryItem[];
  isLoadingSummary: boolean;
  private readonly lastViewedDateKey = "lastViewedDate";

  appointments: Appointment[];
  selectedAppointmentId: number;

  isCreateNewAppointment = false;

  freeSlots: Slot[];
  formGroup = new FormGroup({
    "slotFrom": new FormControl(null, [Validators.required]),
    "slotTo": new FormControl(null, Validators.required)
  });
  isDeletingAppointment: boolean;

  constructor(
    private appointmentsService: AppointmentsService,
    private dialogService: DialogService,
    private appointmentDialogService: AppointmentEditorDialogService,
    private dateTimeService: DateTimeService,
    private storageService: StorageService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    let lastViewedDateValue = this.storageService.getValue(this.lastViewedDateKey);
    this.selectedDate = lastViewedDateValue ? new Date(lastViewedDateValue) : new Date();
  }

  onAppointmentSelected(appointmentId: number) {
    this.selectedAppointmentId = appointmentId;
    this.isCreateNewAppointment = !appointmentId;
  }

  onSelectedDateChange(date: Date) {
    this.selectedAppointmentId = null;
    this.storageService.setValue(this.lastViewedDateKey, date.toISOString());
  }

  onCreateAppointmentClicked() {
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

        this.refreshComponents();
      });
  }

  onCancelAppointmentClicked() {
    this.dialogService.showDeleteConfirmation()
      .subscribe(
        r => {
          if (r == true)
            this.deleteAppointment(this.selectedAppointmentId);
        }
      );
  }

  private deleteAppointment(appointmentId: number) {
    this.isDeletingAppointment = true;
    this.appointmentsService.delete(this.selectedAppointmentId)
      .subscribe(
        (r) => {
          this.dialogService.showToast("Appointment deleted successfully.", "info");

          this.refreshComponents();
        },
        (r) => this.dialogService.showToast("Error deleting appointment.", "error"),
        () => { this.selectedAppointmentId = null; this.isDeletingAppointment = false; }
      );
  }

  private refreshComponents() {
    // Force refresh
    let date = new Date(this.selectedDate);
    this.selectedDate = null;
    this.selectedDate = date;

    this.onMonthChanged({ month: this.selectedDate.getMonth(), year: this.selectedDate.getFullYear() });
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
