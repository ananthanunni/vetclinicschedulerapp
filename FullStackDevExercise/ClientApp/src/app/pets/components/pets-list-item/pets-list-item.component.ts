import { Component, OnInit, Input } from '@angular/core';
import { Pet } from '../../services/pet.service';

@Component({
  selector: 'pets-pets-list-item',
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
