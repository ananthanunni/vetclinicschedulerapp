import { Injectable } from '@angular/core';
import { HttpHelperService } from '../../shared-core/services/http-helper.service';

@Injectable()
export class PetService {
  constructor(private http: HttpHelperService) { }
}
