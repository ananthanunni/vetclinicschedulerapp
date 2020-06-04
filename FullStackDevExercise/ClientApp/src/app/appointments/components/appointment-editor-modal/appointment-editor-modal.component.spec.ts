import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentEditorModalComponent } from './appointment-editor-modal.component';

describe('AppointmentEditorModalComponent', () => {
  let component: AppointmentEditorModalComponent;
  let fixture: ComponentFixture<AppointmentEditorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentEditorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
