import { Component, OnInit, Input } from '@angular/core';
import { Pet } from '../../../shared-services/services/pet.service';

@Component({
  selector: 'shared-services-pets-list-item',
  templateUrl: './pets-list-item.component.html',
  styleUrls: ['./pets-list-item.component.css']
})
export class PetsListItemComponent implements OnInit {

  constructor() { }

  @Input("pet")
  pet: Pet;

  ngOnInit(): void {
  }

}
