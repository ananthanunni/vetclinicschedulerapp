import { TestBed } from '@angular/core/testing';

import { AppointmentEditorDialogService } from './appointment-editor-dialog.service';

describe('AppointmentEditorDialogService', () => {
  let service: AppointmentEditorDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentEditorDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
