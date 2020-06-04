import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataEditViewModalConfiguration, DataEditViewModalField, ListOption } from '../../services/data-editor-dialog.service';
import { DialogService } from '../../services/dialog.service';
import { DialogButton } from '../modal/modal.component';

@Component({
  selector: 'shared-core-data-edit-view-modal',
  templateUrl: './grid-data-edit-view-modal.component.html',
  styleUrls: ['./grid-data-edit-view-modal.component.css']
})
export class DataEditViewModalComponent implements OnInit {
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal, private domSanitizer: DomSanitizer, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.initialize();
  }

  @Input("config")
  config: DataEditViewModalConfiguration;

  get displayTitle() { return this.domSanitizer.bypassSecurityTrustHtml(this.config.title); };

  buttonClicked(button: DialogButton) {
    if (button.value !== "save" || this.formGroup.pristine) {
      this.activeModal.close({ success: null, data: this.config.data });
      return;
    }

    // Save
    this.config.onSave(this.formGroup.value)
      .subscribe(
        r => {
          this.activeModal.close({ success: true, data: this.formGroup.value });
          this.dialogService.showToast("Record saved successfully.", "success")
        },
        r => this.dialogService.showToast("Error saving record.", "error"));
  }

  private initialize() {
    let controls: {
      [key: string]: AbstractControl
    } = {};

    for (let item of this.config.fields) {
      let dataItem = this.config.data[item.fieldName];
      controls[item.fieldName] = new FormControl(dataItem, item.validators);
    }

    this.formGroup = new FormGroup(controls);

    for (let saveButton of this.config.buttons.filter(r => r.value === "save"))
      saveButton.enabled = () => this.formGroup.valid;
  }

  getType(field: DataEditViewModalField) {
    if (field.type === "number") return "number";

    if (Array.isArray(field.type)) return "select";

    return "string";
  }
}
