import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '../../../shared-core/services/dialog.service';
import { PetService, Pet } from '../../../shared-services/services/pet.service';

@Component({
  selector: 'shared-services-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css']
})
export class PetsListComponent implements OnInit {
  isLoading: boolean;
  isSavingPet = false;
  collection: Pet[];

  constructor(private petService: PetService, private dialogService: DialogService) { }

  @Input("ownerId")
  ownerId: number;

  ngOnInit(): void {
    this.loadData();
  }

  createPet() {
    this.isSavingPet = true;
    let newPet = new Pet();
    newPet.id = 0;
    newPet.ownerId = this.ownerId;
    newPet.type = "dog";

    this.petService.save(newPet)
      .subscribe(
        r => {
          if (r.success) {
            this.collection.push(r.data);
          }
          this.isSavingPet = false;
        },
        r => {
          this.dialogService.showToast("Error saving pet.", "error");
          this.isSavingPet = false;
        }
      );
  }

  onDeleteRequested(pet: Pet) {
    pet["isDeleting"] = true;

    this.petService.delete(pet.ownerId,pet.id)
      .subscribe(
        r => {
          this.collection.splice(this.collection.indexOf(pet), 1);
          this.dialogService.showToast("Item deleted successfully.", "success");
        },
        r => {
          this.dialogService.showToast("Error deleting item.", "error");
          pet["isDeleting"] = false;
        }
      );
  }

  private loadData() {
    this.isLoading = true;
    this.petService.getPetsForOwner(this.ownerId)
      .subscribe(
        r => this.collection = r,
        r => this.dialogService.showToast("An error occured while loading pets list.", "error"),
        () => this.isLoading = false
      )
  }
}
