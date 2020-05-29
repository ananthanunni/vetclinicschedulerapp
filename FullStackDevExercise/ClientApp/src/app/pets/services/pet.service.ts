import { Injectable } from '@angular/core';
import { HttpHelperService } from '../../shared-core/services/http-helper.service';

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
  type: string;
  name: string;
  age: number;
}
