import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayScheduleListComponent } from './day-schedule-list.component';

describe('DayScheduleListComponent', () => {
  let component: DayScheduleListComponent;
  let fixture: ComponentFixture<DayScheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayScheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
