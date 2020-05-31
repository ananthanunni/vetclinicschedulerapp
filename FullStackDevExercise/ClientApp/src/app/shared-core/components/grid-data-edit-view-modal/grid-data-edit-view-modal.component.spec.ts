import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEditViewModalComponent } from './grid-data-edit-view-modal.component';

describe('GridDataEditViewModalComponent', () => {
  let component: DataEditViewModalComponent;
  let fixture: ComponentFixture<DataEditViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataEditViewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEditViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
