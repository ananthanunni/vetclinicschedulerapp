import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GridColumn } from '../components/simple-grid/simple-grid.component';
import { DataEditorDialogService, DataEditViewModalField } from './data-editor-dialog.service';
import { DialogService } from './dialog.service';

@Injectable()
export class GridDialogService {

  constructor(private dialogService:DialogService, private dataEditorDialogService: DataEditorDialogService) { }

  deleteConfirm(message: string, title: string): Observable<boolean> {
    return this.dialogService.showDeleteConfirmation(
      "Are you sure you wish to delete this item?"
    );
  }

  saveGridRow<T>(title: string, columns: GridColumn<T>[], data: T, onSave: (data: T) => Observable<boolean>) {
    return this.dataEditorDialogService.editItem<T>(
      title,
      columns.map(r => new DataEditViewModalField(r.fieldName, r.title, r.type, r.isReadOnly)),
      data,
      onSave);
  }
}
