import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataEditViewModalComponent } from '../components/grid-data-edit-view-modal/grid-data-edit-view-modal.component';
import { DialogConfiguration, DialogButton } from '../components/modal/modal.component';
import { FormGroup } from '@angular/forms';

@Injectable()
export class DataEditorDialogService {

  constructor(private modalService: NgbModal) { }

  editItem<T>(title: string, columns: DataEditViewModalField[], data: T, onSave: (data: T) => Observable<boolean>) {
    let modalRef = this.modalService.open(DataEditViewModalComponent);
    modalRef.componentInstance.config = new DataEditViewModalConfiguration(
      title,
      columns,
      data,
      onSave
    );

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
    canSave: (data: FormGroup, ) => boolean = (data: FormGroup) => true,
    additionalButtons: DialogButton[] = null,
  ) {
    super("", title, onSave != null ?
      [
        DataEditViewModalConfiguration.saveButton,
        DataEditViewModalConfiguration.cancelButton
      ] :
      [DataEditViewModalConfiguration.closeButton], true);

    if (additionalButtons)
      additionalButtons.forEach(r => this.buttons.push(r));
  }

  static readonly closeButton: DialogButton = new DialogButton("cancel", false, "fa fa-times", "Close", false);
  static readonly cancelButton: DialogButton = new DialogButton("cancel", false, "fa fa-times", "Close");
  static readonly saveButton: DialogButton = new DialogButton("save", true, "fa fa-save", "Save");
}

export class DataEditViewModalField {
  constructor(public fieldName: string, public title: string, public type: "string" | "number" | "date" = "string", public isHidden = false, ) { }
}
