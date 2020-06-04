import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AppConstants } from '../../../AppConstants';
import { DialogButton, DialogConfiguration } from '../../../shared-core/components/modal/modal.component';
import { DialogService } from '../../../shared-core/services/dialog.service';
import { Appointment, Slot } from '../../services/appointments.service';
import { DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'app-appointment-editor-modal',
  templateUrl: './appointment-editor-modal.component.html',
  styleUrls: ['./appointment-editor-modal.component.css']
})
export class AppointmentEditorModalComponent implements OnInit {
  isLoading: boolean;
  appointment: Appointment;
  isSaving = false;

  formGroup: FormGroup = new FormGroup({
    "id": new FormControl(null, [(v) => parseInt(v.value) !== 0 ? { "invalidId": "Id must be zero." } : null]),
    "petId": new FormControl(null, [Validators.required, Validators.min(1)]),
    "notes": new FormControl(null),
    "slotFrom": new FormControl(null, [Validators.required]),
    "slotTo": new FormControl(null, [Validators.required]),
  });

  constructor(public activeModal: NgbActiveModal, private dialogService: DialogService, private dateTimeService: DateTimeService) { }

  @Input("config")
  config: AppointmentEditorDialogConfiguration;

  ngOnInit(): void {
    this.initialize();
  }

  buttonClicked(button: DialogButton) {
    debugger;
    if (!button.value || button.value !== true || this.formGroup.pristine) {
      this.activeModal.close({ success: null, data: this.formGroup.value });
      return;
    }

    // Save
    this.isSaving = true;

    this.saveAppointment(this.formGroup.value)
      .subscribe(
        r => {
          if (r != null && r.id > 0) {
            this.activeModal.close({ success: true, data: r });
            this.dialogService.showToast("Item updated successfully.", "success")
          }
        },
        r => this.dialogService.showToast("Error saving record.", "error"),
        () => this.isSaving = false);
  }

  saveAppointment(appointment: Appointment) {
    return this.config.onSaveAppointment(appointment);
  }

  private initialize() {
    this.isLoading = true;
    this.appointment = null;

    let saveButton = this.config.buttons.find(r => r.value === true);
    saveButton.enabled = () => !this.isSaving && this.formGroup?.valid;

    this.config.appointmentEntryProvider()
      .then(
        r => {
          this.appointment = r;
          this.appointment.id;

          this.formGroup.get("id").setValue(this.appointment.id);
          this.formGroup.get("petId").setValue(r.petId);
          this.formGroup.get("notes").setValue(r.notes);
          this.formGroup.get("slotFrom").setValue(r.slotFrom);
          this.formGroup.get("slotTo").setValue(r.slotTo);
        }
      )
      .catch(r => this.dialogService.showToast("Error loading appointment item."))
      .finally(() => {
        this.isLoading = false;
      })
  }

  isTimeSelected() { return this.formGroup?.get("slotFrom")?.valid; }

  get displayTitle() { return !!this.appointment?.id ? "Edit appointment" : "Create appointment"; }
  get displayFromTime() { return this.toDisplayTime("slotFrom"); }
  get displayToTime() { return this.toDisplayTime("slotTo", true); }

  private toDisplayTime(formControlName: string, isToTime = false) {
    let value: Date = this.formGroup?.get(formControlName)?.value;
    if (!value) return "N/A";

    let date = new Date(value);

    if (date && isToTime)
      date.setMinutes(date.getMinutes() + AppConstants.slotDurationInMinutes);

    return date ? this.dateTimeService.toFriendlyTimeDisplay(date, false, true, false) : "N/A";
  }
}

export class AppointmentEditorDialogConfiguration extends DialogConfiguration {
  date: Date;
  constructor() {
    super("", "", [
      new DialogButton(true, true, "fa fa-save", "Save"),
      new DialogButton(false, false, "", "Cancel")
    ])
  }
  freeSlots: Slot[];
  existingAppointments: Appointment[];
  appointmentEntryProvider: () => Promise<Appointment>;
  onSaveAppointment: (appointment: Appointment) => Observable<Appointment>;
}
