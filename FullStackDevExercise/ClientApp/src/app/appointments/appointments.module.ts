import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './appointments.routes';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { DateTimeService } from './services/date-time.service';
import { HomeComponent } from './components/home/home.component';
import { DayScheduleListComponent } from './components/day-schedule-list/day-schedule-list.component';
import { AppointmentEditorComponent } from './components/appointment-editor/appointment-editor.component';
import { AppointmentsService } from './services/appointments.service';


@NgModule({
  declarations: [CalendarComponent, HomeComponent, DayScheduleListComponent, AppointmentEditorComponent],
  imports: [
    CommonModule,
    SharedCoreModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DateTimeService,
    AppointmentsService
  ],
  entryComponents: [
    AppointmentEditorComponent
  ]
})
export class AppointmentsModule { }
