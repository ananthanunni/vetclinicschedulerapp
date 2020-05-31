import { TestBed } from '@angular/core/testing';

import { OwnerDialogService } from './owner-dialog.service';

describe('OwnerDialogService', () => {
  let service: OwnerDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
