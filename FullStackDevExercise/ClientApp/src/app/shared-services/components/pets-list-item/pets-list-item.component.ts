import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from '../../../shared-services/services/pet.service';
import { DialogService } from '../../../shared-core/services/dialog.service';

@Component({
  selector: 'shared-services-pets-list-item',
  templateUrl: './pets-list-item.component.html',
  styleUrls: ['./pets-list-item.component.css']
})
export class PetsListItemComponent implements OnInit {

  constructor(private dialogService:DialogService) { }

  @Input("pet")
  pet: Pet;

  @Output("onDeleteRequested")
  onDeleteRequested = new EventEmitter<Pet>();

  ngOnInit(): void {
  }

  onDeletePetClicked() {
    this.dialogService.showDeleteConfirmation()
      .subscribe(
        r => {
          if (r)
            this.onDeleteRequested.emit(this.pet);
        }
      );    
  }
}
