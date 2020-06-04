import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { SharedServicesModule } from '../shared-services/shared-services.module';
import { routes } from './appointments.routes';
import { AppointmentEditorModalComponent } from './components/appointment-editor-modal/appointment-editor-modal.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DayScheduleListComponent } from './components/day-schedule-list/day-schedule-list.component';
import { HomeComponent } from './components/home/home.component';
import { OwnerSelectorModalComponent } from './components/owner-selector-modal/owner-selector-modal.component';
import { PetLookupComponent } from './components/pet-lookup/pet-lookup.component';
import { TimeSlotPickerComponent } from './components/time-slot-picker/time-slot-picker.component';
import { AppointmentEditorDialogService } from './services/appointment-editor-dialog.service';
import { AppointmentsService } from './services/appointments.service';
import { DateTimeService } from './services/date-time.service';

@NgModule({
  declarations: [CalendarComponent, HomeComponent, DayScheduleListComponent, AppointmentEditorModalComponent, PetLookupComponent, OwnerSelectorModalComponent, TimeSlotPickerComponent],
  imports: [
    CommonModule,
    SharedCoreModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedServicesModule    
  ],
  providers: [
    DateTimeService,
    AppointmentsService,
    AppointmentEditorDialogService
  ],
  entryComponents: [
    AppointmentEditorModalComponent
  ]
})
export class AppointmentsModule { }
