import { Injectable } from '@angular/core';
import { HttpHelperService } from '../../shared-core/services/http-helper.service';
import { Pet } from '../../pets/services/pet.service';
import { Owner } from '../../owners/services/owner.service';

@Injectable()
export class AppointmentsService {
  constructor(private http: HttpHelperService) { }

  getAppointmentsForDate(date: Date) {
    return this.http.get<Appointment[]>(this.http.resolveApiUrl("appointments", date.getFullYear(), date.getMonth(), date.getDate()));
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
