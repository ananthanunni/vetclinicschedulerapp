import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentEditorDialogConfiguration, AppointmentEditorModalComponent } from '../components/appointment-editor-modal/appointment-editor-modal.component';
import { Appointment, AppointmentsService, Slot } from './appointments.service';
import { Subject } from 'rxjs';

@Injectable()
export class AppointmentEditorDialogService {
  constructor(private ngbModal: NgbModal, private appointmentService: AppointmentsService) { }

  saveAppointment(
    appointment: Appointment,
    freeSlots: Slot[] = [],
    existingAppointments: Appointment[],
    date: Date
  ) {
    let subject = new Subject<Appointment>();
    let modalRef: NgbModalRef = this.ngbModal.open(AppointmentEditorModalComponent, { backdrop: "static", keyboard: false, size: "lg" });

    let config = new AppointmentEditorDialogConfiguration();
    config.freeSlots = freeSlots;
    config.appointmentEntryProvider = () => Promise.resolve(appointment);
    config.existingAppointments = existingAppointments || [];
    config.date = date;
    config.onSaveAppointment = (appointment) => this.appointmentService.save(appointment);

    modalRef.componentInstance.config = config;
    let dialogResult: Promise<Appointment> = modalRef.result;

    dialogResult
      .then(r => subject.next(r))
      .catch(r => subject.next(null))
      .finally(() => subject.unsubscribe());

    return subject;
  }
}
