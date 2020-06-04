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
    collection: Pet[];

  constructor(private petService: PetService, private dialogService:DialogService) { }

  @Input("ownerId")
  ownerId: number;

  ngOnInit(): void {
    this.loadData();
  }
  private loadData() {
    this.isLoading = true;
    this.petService.getPetsForOwner(this.ownerId)
      .subscribe(
        r => this.collection = r,
        r => this.dialogService.showToast("An error occured while loading pets list.", "error"),
        ()=> this.isLoading = false
      )
  }


}
