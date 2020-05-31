import { Component, OnInit, Input } from '@angular/core';
import { DialogConfiguration, DialogButton } from '../modal/modal.component';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GridColumn } from '../simple-grid/simple-grid.component';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'shared-core-grid-data-edit-view-modal',
  templateUrl: './grid-data-edit-view-modal.component.html',
  styleUrls: ['./grid-data-edit-view-modal.component.css']
})
export class GridDataEditViewModalComponent implements OnInit {
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal, private domSanitizer: DomSanitizer, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.initialize();
  }

  @Input("config")
  config: GridDataEditViewDialogConfiguration;

  get displayTitle() { return this.domSanitizer.bypassSecurityTrustHtml(this.config.title); };

  buttonClicked(button: DialogButton) {
    if (button.value !== "save") {
      this.activeModal.close({ success: null, data: this.config.data });
      return;
    }

    // Save
    this.config.onSave(this.formGroup.value)
      .subscribe(r => {
        this.activeModal.close({ success: true, data: this.formGroup.value });
      },
        r => {
          this.dialogService.showToast("Error saving record.", "error");
        });
  }

  private initialize() {
    let controls: {
      [key: string]: AbstractControl
    } = {};

    for (let item of this.config.columns) {
      let dataItem = this.config.data[item.fieldName];
      controls[item.fieldName] = new FormControl(dataItem);
    }

    this.formGroup = new FormGroup(controls);
  }
}

export class GridDataEditViewDialogConfiguration extends DialogConfiguration {
  constructor(title: string, public columns: GridColumn<any>[], public data: any, public onSave: (data: any) => Observable<any>, additionalButtons: DialogButton[] = null) {
    super("", title, onSave != null ?
      [
        GridDataEditViewDialogConfiguration.saveButton,
        GridDataEditViewDialogConfiguration.cancelButton
      ] :
      [GridDataEditViewDialogConfiguration.closeButton], true);

    if (additionalButtons)
      additionalButtons.forEach(r => this.buttons.push(r));
  }

  static readonly closeButton: DialogButton = new DialogButton("cancel", false, "fa fa-times", "Close", false);
  static readonly cancelButton: DialogButton = new DialogButton("cancel", false, "fa fa-times", "Close");
  static readonly saveButton: DialogButton = new DialogButton("save", true, "fa fa-save", "Save");
}
