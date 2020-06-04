import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwnerSelectorModalComponent, OwnerSelectorModalConfiguration } from '../owner-selector-modal/owner-selector-modal.component';
import { OwnerService, Owner } from '../../../shared-services/services/owner.service';
import { PetService, Pet } from '../../../shared-services/services/pet.service';
import { DialogService } from '../../../shared-core/services/dialog.service';

@Component({
  selector: 'appointments-pet-lookup',
  templateUrl: './pet-lookup.component.html',
  styleUrls: ['./pet-lookup.component.css']
})
export class PetLookupComponent implements OnInit {
  petCollection: Pet[];
  selectedPetId: number;
  constructor(private ownerService: OwnerService, private petService: PetService, private dialogService: DialogService, private ngbModal: NgbModal) { }

  @Input("group")
  group: FormGroup;

  @Input("controlName")
  controlName: string;

  owner: Owner;
  petSearchText = "";

  ngOnInit(): void {

  }

  changeOwner() {
    let modal = this.ngbModal.open(OwnerSelectorModalComponent);
    let component: OwnerSelectorModalComponent = modal.componentInstance;

    let config = new OwnerSelectorModalConfiguration();

    component.config = config;
    modal.result
      .then(r => {
        if (!!this.owner && this.owner.id > 0 && this.owner.id === r.id) return;

        this.owner = new Owner(r.id, r.firstName, r.lastName);
        this.group.get(this.controlName).setValue(this.owner.id);

        if (this.owner?.id)
          this.loadPetsData();
      })
      .catch(() => { })
      .finally();
  }

  loadPetsData() {
    this.petCollection = [];
    this.selectedPetId = null;
    this.petService.getPetsForOwner(this.owner.id)
      .subscribe(
        r => {
          this.petCollection = r;
          this.selectedPetId = r?.length > 0 ? r[0].id : null;

          this.onSelectedPetChanged(this.selectedPetId);
        },
        e => this.dialogService.showToast("Error while loading pet list.")
      );
  }

  onSelectedPetChanged(id: number) {
    this.group.get(this.controlName).setValue(this.selectedPetId);
  }
}
