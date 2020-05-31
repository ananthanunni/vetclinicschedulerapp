import { TestBed } from '@angular/core/testing';

import { DataEditorDialogService } from './data-editor-dialog.service';

describe('DataEditorDialogService', () => {
  let service: DataEditorDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataEditorDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
