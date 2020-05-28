import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'shared-core-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {

  }

  @Input("config")
  config: DialogConfiguration;

  get displayMessage() { return this.domSanitizer.bypassSecurityTrustHtml(this.config.message); };
  get displayTitle() { return this.domSanitizer.bypassSecurityTrustHtml(this.config.title); };

  buttonClicked(btn: DialogButton) {
    this.activeModal.close(btn.value);
  }
}

export class DialogButton {
  constructor(public value: any, public isDefault: boolean, public iconCss: string, public label: string, public isDanger = false, public enabled: () => boolean = () => true) { }
}

export class DialogConfiguration {
  constructor(public message: string, public title: string = "", public buttons: DialogButton[], public allowDismiss: boolean = true) { }
}
