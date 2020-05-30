import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateTimeService, MonthInfo, WeekDay } from '../../services/date-time.service';

@Component({
  selector: 'appointments-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  weekDays: WeekDay[];

  constructor(private dateTimeService: DateTimeService) { }

  calendarWeeks: CalendarWeek[] = [];

  month: MonthInfo;

  @Input("date")
  date: Date = new Date();

  @Output("dateChange")
  dateChange = new EventEmitter<Date>();

  moveMonth(offset: number) {
    let nextMonth = offset > 0 ? this.month.endDate : this.month.startDate;
    nextMonth.setDate(nextMonth.getDate() + offset);
    this.month = new MonthInfo(nextMonth.getFullYear(), nextMonth.getMonth());

    this.dateChange.emit(this.date);
    this.refreshCalendar();
  }

  selectDay(day: CalendarCell) {
    if (day.date) {
      this.date = day.date;
      this.dateChange.emit(this.date);
    }
  }

  ngOnInit(): void {
    this.setDate(this.date || new Date());
    this.refreshCalendar();
  }

  private setDate(date: Date) {
    this.month = new MonthInfo(this.date.getFullYear(), this.date.getMonth());
  }

  private refreshCalendar() {
    this.calendarWeeks = [];
    this.weekDays = this.dateTimeService.getWeekDayNames();

    let offset = this.month.startDate.getDay();
    let end = this.month.dates.length + offset;
    while (end % 7 != 0)
      end++;
    let weeks = Math.round(end / 7);

    for (let wk = 0; wk < weeks; wk++) {
      let cells: CalendarCell[] = [];

      for (let i = wk * 7; i < (wk + 1) * 7; i++) {
        if (i < offset)
          cells.push(new CalendarCell());
        else
          cells.push(new CalendarCell(this.month.dates[i - offset]));
      }

      this.calendarWeeks.push(new CalendarWeek(wk, cells));
    }
  }
}

class CalendarWeek {
  constructor(public weekNumber: number, public dates: CalendarCell[]) { }
}

class CalendarCell {
  constructor(public date: Date = null) { }
  eventsCount = 0;
  get isHoliday() {
    return this.date?.getDay() === 0;
  }

  get dateNumber() { return this.date?.getDate(); }
}
