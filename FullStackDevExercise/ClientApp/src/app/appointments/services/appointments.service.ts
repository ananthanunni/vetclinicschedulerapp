import { Injectable } from '@angular/core';
import { Owner } from '../../owners/services/owner.service';
import { Pet } from '../../pets/services/pet.service';
import { HttpHelperService } from '../../shared-core/services/http-helper.service';
import { map, tap } from 'rxjs/operators';

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
}

export class Appointment {
  id: number;
  petId: number;
  slotFrom: Date;
  slotTo: Date;
  notes: string;

  pet: Pet;
  owner: Owner;
}
