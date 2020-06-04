import { Injectable } from '@angular/core';
import { HttpHelperService } from '../../shared-core/services/http-helper.service';
import { KnownPetType } from '../../AppConstants';

@Injectable()
export class PetService {
  constructor(private http: HttpHelperService) { }

  getPetsForOwner(id: number) {
    return this.http.get<Pet[]>(this.http.resolveApiUrl("pets", id.toString()));
  }
}

export class Pet {
  id: number;
  ownerId: number;
  type: KnownPetType;
  name: string;
  age: number;
}
