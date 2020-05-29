import { TestBed } from '@angular/core/testing';

import { GridDialogService } from './grid-dialog.service';

describe('GridDialogService', () => {
  let service: GridDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
