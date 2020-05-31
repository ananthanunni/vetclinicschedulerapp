import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { DialogButton, DialogConfiguration, ModalComponent } from '../components/modal/modal.component';
import { GridColumn } from '../components/simple-grid/simple-grid.component';
import { DataEditorDialogService, DataEditViewModalField } from './data-editor-dialog.service';

@Injectable()
export class GridDialogService {

  constructor(private modalService: NgbModal, private dataEditorDialogService: DataEditorDialogService) { }

  deleteConfirm(message: string, title: string): Observable<boolean> {
    let modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.config = new DialogConfiguration(
      message || "Are you sure you wish to delete this item?",
      title || "Confirm",
      [
        new DialogButton(true, false, "fa fa-trash", "DELETE", true),
        new DialogButton(false, false, "", "Cancel"),
      ]);

    let subject = new Subject<boolean>();

    modalRef.result.then(r => { subject.next(r === true); subject.unsubscribe(); }, r => { subject.next(false); subject.unsubscribe(); });

    return subject;
  }

  saveGridRow<T>(title: string, columns: GridColumn<T>[], data: T, onSave: (data: T) => Observable<boolean>) {
    return this.dataEditorDialogService.editItem<T>(
      title,
      columns.map(r => new DataEditViewModalField(r.fieldName, r.title, r.type, r.isReadOnly)),
      data,
      onSave);
  }
}
