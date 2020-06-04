import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataEditViewModalComponent } from '../components/grid-data-edit-view-modal/grid-data-edit-view-modal.component';
import { DialogConfiguration, DialogButton } from '../components/modal/modal.component';
import { FormGroup, ValidatorFn, AbstractControlOptions } from '@angular/forms';

@Injectable()
export class DataEditorDialogService {

  constructor(private modalService: NgbModal) { }

  editItem<T>(title: string, columns: DataEditViewModalField[], data: T, onSave: (data: T) => Observable<boolean>) {
    let modalRef = this.modalService.open(DataEditViewModalComponent);
    let modalConfig: DataEditViewModalConfiguration = new DataEditViewModalConfiguration(
      title,
      columns,
      data,
      onSave,
      (data: FormGroup) => data.valid
    );

    modalRef.componentInstance.config = modalConfig;

    let subject = new Subject<{ success: boolean, data: T }>();

    modalRef.result.then(
      (r: { success: boolean, data: T }) => { subject.next(r); subject.unsubscribe(); },
      (r => { subject.next({ success: null, data: null }); subject.unsubscribe(); }));

    return subject;
  }
}

export class DataEditViewModalConfiguration extends DialogConfiguration {
  constructor(
    title: string,
    public fields: DataEditViewModalField[],
    public data: any,
    public onSave: (data: any) => Observable<any>,
    public canSave: (data: FormGroup, ) => boolean = (data: FormGroup) => true,
    additionalButtons: DialogButton[] = null,
  ) {
    super("", title, onSave != null ?
      [
        DataEditViewModalConfiguration.saveButton(),
        DataEditViewModalConfiguration.cancelButton()
      ] :
      [DataEditViewModalConfiguration.closeButton()], true);

    if (additionalButtons)
      additionalButtons.forEach(r => this.buttons.push(r));
  }

  static closeButton(): DialogButton { return new DialogButton("cancel", false, "fa fa-times", "Close", false); }
  static cancelButton(): DialogButton { return new DialogButton("cancel", false, "fa fa-times", "Close"); }
  static saveButton(): DialogButton { return new DialogButton("save", true, "fa fa-save", "Save"); }
}

export class DataEditViewModalField {
  constructor(
    public fieldName: string,
    public title: string,
    public type: "string" | "number" | ListOption[] = "string",
    public isHidden = false,
    public validators: ValidatorFn | ValidatorFn[] | AbstractControlOptions = null) { }
}

export class ListOption {
  constructor(public text: string, public value: string) { }
}
