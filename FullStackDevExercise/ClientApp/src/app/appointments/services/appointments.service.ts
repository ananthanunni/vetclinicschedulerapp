import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../AppConstants';
import { HttpHelperService } from '../../shared-core/services/http-helper.service';
import { Owner } from '../../shared-services/services/owner.service';
import { Pet } from '../../shared-services/services/pet.service';
import { Observable } from 'rxjs';

@Injectable()
export class AppointmentsService {
  constructor(private http: HttpHelperService) { }

  getAppointmentsForDate(date: Date) {
    return this.http.get<Appointment[]>(this.http.resolveApiUrl("appointments", date.getFullYear(), date.getMonth(), date.getDate()))
      .pipe(
        map(collection => {
          return (collection || [])
            .map(r => {
              r.slotFrom = new Date(r.slotFrom);
              r.slotTo = new Date(r.slotTo);
              return r;
            })
        })
      );
  }

  getSummaryForMonth(year: number, month: number) {
    return this.http.get<MonthlySummaryItem[]>(this.http.resolveApiUrl("appointments", "summary", year, month))
      .pipe(
        map(collection => {
          return (collection || [])
            .map(r => {
              r.date = new Date(r.date);
              return r;
            })
        })
      );
  }

  getSlotsForDay(date: Date) {
    let slots: ScheduleSlot[] = [];
    let start = AppConstants.openHour;
    let end = AppConstants.closeHour;

    let today = new Date(date);
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth();
    let todayDate = today.getDate();

    let openEmptySlots = [...Array(~~((~~(AppConstants.openHour % 100)) / AppConstants.slotDurationInMinutes)).keys()].map(r => r * AppConstants.slotDurationInMinutes);
    for (let emptySlot of openEmptySlots)
      slots.push(new ScheduleSlot(new Date(todayYear, todayMonth, todayDate, ~~(start / 100), emptySlot), AppConstants.slotDurationInMinutes, "outofoffice"));

    let slot = start;

    while (slot < end) {
      let slotStartDateTime = new Date(todayYear, todayMonth, todayDate, ~~(slot / 100), slot % 100);
      let newSlot = new ScheduleSlot(
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
        slots.push(new ScheduleSlot(
          new Date(todayYear, todayMonth, todayDate, ~~(slot / 100), slot % 100),
          AppConstants.slotDurationInMinutes,
          "outofoffice"
        ));
    }

    return slots;
  }

  save(appointment: Appointment) {
    let data: any = appointment;
    data.slotFrom = appointment.slotFrom.toJSON();
    data.slotTo = appointment.slotTo.toJSON();
    return this.http.post<Appointment, Appointment>(this.http.resolveApiUrl("appointments"), data);
  }

  delete(appointmentId: number) {
    return this.http.delete<boolean>(this.http.resolveApiUrl("appointments", appointmentId));
  }
}

export class Appointment {
  constructor(public id: number = 0) { }
  petId: number;
  slotFrom: Date;
  slotTo: Date;
  notes: string;

  pet: Pet;
  owner: Owner;
}

export class MonthlySummaryItem {
  date: Date;
  count: number;
}

export class Slot {
  constructor(public start: Date, durationInMinutes: number) { }
  isBlocked = false;
}

class ScheduleSlot extends Slot {
  constructor(start: Date, durationInMinutes: number, public inactiveReason: "outofoffice" | "break" = null) {
    super(start, durationInMinutes);
  }

  isInHour(hour: number) {
    return this.start.getHours() === hour;
  }

  appointment: Appointment;

  get isInactive() { return !!this.inactiveReason; }
}

