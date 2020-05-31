import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { DateTimeService, MonthInfo, WeekDay } from '../../services/date-time.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MonthlySummaryItem } from '../../services/appointments.service';

@Component({
  selector: 'appointments-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnChanges {
  weekDays: WeekDay[];

  constructor(private dateTimeService: DateTimeService, private sanitizer: DomSanitizer) { }

  calendarWeeks: CalendarWeek[] = [];

  month: MonthInfo;

  @Input("date")
  date: Date = new Date();

  @Input("events")
  events: MonthlySummaryItem[];

  @Output("dateChange")
  dateChange = new EventEmitter<Date>();

  @Output("onMonthChanged")
  onMonthChanged = new EventEmitter<{ year: number, month: number }>();

  moveMonth(offset: number) {
    let nextMonth = offset > 0 ? this.month.endDate : this.month.startDate;
    nextMonth.setDate(nextMonth.getDate() + offset);
    this.month = new MonthInfo(nextMonth.getFullYear(), nextMonth.getMonth());

    this.dateChange.emit(this.date);
    this.refreshCalendar();

    this.events = [];
    this.onMonthChanged.emit({ year: nextMonth.getFullYear(), month: nextMonth.getMonth() });
  }

  selectDay(day: CalendarCell) {
    if (day.date && day.date.toDateString() !== this.date?.toDateString()) {
      this.date = day.date;
      this.dateChange.emit(this.date);
    }
  }

  toFriendlyDateDisplay(date: Date, sanitize = true) {
    let value = this.dateTimeService.toFriendlyDateDisplay(date, true, true, true, true, true);

    if (sanitize) return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  isSelectedDate(day: CalendarCell) {
    return day.date &&
      day.date.getFullYear() === this.date.getFullYear() &&
      day.date.getMonth() === this.date.getMonth() &&
      day.date.getDate() === this.date.getDate();
  }

  ngOnInit(): void {
    this.setDate(this.date);
    this.onMonthChanged.emit({ year: this.date.getFullYear(), month: this.date.getMonth() });
  }

  ngOnChanges(changes: SimpleChanges) {
    let change: SimpleChange = changes["events"];
    if (!!change) {
      let summaryItems: MonthlySummaryItem[] = change.currentValue;

      for (let item of summaryItems || []) {
        let week = this.calendarWeeks.find(wk => wk.dates.findIndex(d => d.date?.getDate() === item.date.getDate()) >= 0);
        let date = week.dates.find(d => d.date?.getDate() === item.date.getDate());
        date.eventsCount = item.count;
      }
    }
  }

  setDate(date: Date = null) {
    let requiresMonthChange = false;
    if (!date) {
      date = new Date();
      requiresMonthChange = true;
    }
    else
      requiresMonthChange = this.date.getFullYear() != date.getFullYear() || this.date.getMonth() != date.getMonth();

    if (!this.month || this.month.startDate.getFullYear() !== date.getFullYear() || this.month.startDate.getMonth() !== date.getMonth())
      this.month = new MonthInfo(date.getFullYear(), date.getMonth());

    this.refreshCalendar();

    let cell = ([] as CalendarCell[]).concat(...this.calendarWeeks.map(r => r.dates)).find(r => r.date && r.date.toDateString() === date.toDateString());
    if (cell)
      this.selectDay(cell);

    if (requiresMonthChange)
      this.onMonthChanged.emit({ year: date.getFullYear(), month: date.getMonth() });
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
