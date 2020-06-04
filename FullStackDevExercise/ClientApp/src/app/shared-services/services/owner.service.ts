import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '../../shared-core/services/http-helper.service';
@Injectable()
export class OwnerService {
  constructor(private http: HttpHelperService) { }

  getOwners(): Observable<Owner[]> {
    return this.http.get(this.http.resolveApiUrl("owners"));
  }

  deleteOwner(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.http.resolveApiUrl("owners", id.toString()))
  }

  save(data: Owner): Observable<Owner> {
    return (data?.id || 0) === 0 ?
      this.http.post<Owner, Owner>(this.http.resolveApiUrl("owners"), data) :
      this.http.put<Owner, Owner>(this.http.resolveApiUrl("owners", data.id.toString()), data);
  }
}

export class Owner {
  constructor(public id: number = null, public firstName: string = null, public lastName: string = null) { }

  get fullName() {
    let separator = !this.firstName || !this.lastName ? "" : " ";

    return `${this?.firstName || ""}${separator}${this?.lastName || ""}`;
  }
}
