import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Owner } from '../../../shared-services/services/owner.service';
import { DialogConfiguration, DialogButton } from '../../../shared-core/components/modal/modal.component';

@Component({
  selector: 'appointments-owner-selector-modal',
  templateUrl: './owner-selector-modal.component.html',
  styleUrls: ['./owner-selector-modal.component.css']
})
export class OwnerSelectorModalComponent implements OnInit {

  constructor(public activeModal:NgbActiveModal) { }

  @Input("config")
  config: OwnerSelectorModalConfiguration;

  ngOnInit(): void {
  }

  onOwnerSelected(owner: Owner) {
    this.activeModal.close(owner);
  }
}

export class OwnerSelectorModalConfiguration extends DialogConfiguration {
  constructor() {
    super(
      null,
      "Owner lookup",
      [
        new DialogButton(true, true, "fa fa-check", "OK", false),
        new DialogButton(false, false, "", "Close")
      ])
  }
}
