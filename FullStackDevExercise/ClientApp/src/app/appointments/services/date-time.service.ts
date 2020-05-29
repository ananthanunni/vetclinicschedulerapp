import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  constructor() { }

  getWeekDayNames() {
    let today = new Date();
    today.setDate(today.getDate() - today.getDay());

    let weekDayNames: WeekDay[] = [];

    for (let r = 0; r < 7; r++) {
      let d = new Date(today);
      d.setDate(d.getDate() + r);

      weekDayNames.push(new WeekDay(r, d.toLocaleString("day", { weekday: 'long' }), d.toLocaleString("day", { weekday: 'short' }), r === 0));
    }

    return weekDayNames;
  }
}

export class MonthInfo {
  readonly dates: Date[];
  readonly startDate: Date;
  readonly endDate: Date;
  readonly monthName: string;
  readonly year: number;

  constructor(year: number, month: number) {
    this.startDate = new Date(year, month, 1);
    this.endDate = new Date(year, month, 1);

    this.monthName = this.startDate.toLocaleString("default", { month: "long" });
    this.year = this.startDate.getFullYear();

    this.endDate.setMonth(this.endDate.getMonth() + 1);
    this.endDate.setDate(this.endDate.getDate() - 1);

    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(23, 59, 59, 59);

    let dayNumbers = [...Array(this.endDate.getDate()).keys()];
    let days: Date[] = dayNumbers.map(r => {
      let newDate = new Date(this.startDate);
      newDate.setDate(r + 1);
      return newDate;
    });

    this.dates = days;
  }
}

export class WeekDay {
  constructor(public id: number, public longName: string, public shortName: string, public isHoliday = false) { }
}
