import { Injectable } from '@angular/core';
import { HttpHelperService } from '../../shared-core/services/http-helper.service';
import { KnownPetType, AppConstants } from '../../AppConstants';
import { DataEditorDialogService, DataEditViewModalField, ListOption } from '../../shared-core/services/data-editor-dialog.service';
import { map, tap } from 'rxjs/operators';
import { Validators } from '@angular/forms';

@Injectable()
export class PetService {
  constructor(private http: HttpHelperService, private editorService: DataEditorDialogService) { }

  getPetsForOwner(id: number) {
    return this.http.get<Pet[]>(this.http.resolveApiUrl("pets", id.toString()));
  }

  save(pet: Pet = null) {
    let isEditMode = pet?.id > 0;

    return this.editorService.editItem(
      isEditMode ? "Edit pet" : "Create",
      [
        new DataEditViewModalField("id", "Id", "number", true),
        new DataEditViewModalField("ownerId", "Owner Id", "number", true),
        new DataEditViewModalField("type", "Pet type", AppConstants.knownPets.map(r => new ListOption(r.displayName, r.id)), false, Validators.required),
        new DataEditViewModalField("name", "Name", "string", false, Validators.required),
        new DataEditViewModalField("age", "Age", "number", false, [Validators.required, Validators.min(1)]),
      ],
      pet,
      (data) =>
        (isEditMode ? this.http.put<Pet, Pet>(this.http.resolveApiUrl("pets", data.ownerId, data.id), data) : this.http.post<Pet, Pet>(this.http.resolveApiUrl("pets", data.ownerId), data))
          .pipe(
            tap(r => pet.id = r.id),
            map(r => r?.id > 0)
          )
    );
  }

  delete(ownerId: number, id: number) {
    return this.http.delete<boolean>(this.http.resolveApiUrl("pets", ownerId, id));
  }
}

export class Pet {
  id: number;
  ownerId: number;
  type: KnownPetType;
  name: string;
  age: number;
}
