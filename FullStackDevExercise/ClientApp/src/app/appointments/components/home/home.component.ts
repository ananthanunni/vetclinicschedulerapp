import { Component, OnInit } from '@angular/core';
import { AppointmentsService, MonthlySummaryItem } from '../../services/appointments.service';
import { DialogService } from '../../../shared-core/services/dialog.service';
import { DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedDate: Date;
  monthlySummary: MonthlySummaryItem[];
    isLoadingSummary: boolean;

  constructor(private appointmentsService: AppointmentsService, private dialogService:DialogService, private dateTimeService:DateTimeService) {
  }

  ngOnInit(): void {
    this.selectedDate = new Date();
  }

  selectedDateChange(date: Date): void {

  }

  onMonthChanged(month: { year: number, month: number }) {
    this.isLoadingSummary = true;
    this.appointmentsService.getSummaryForMonth(month.year, month.month)
      .subscribe(
        r => this.monthlySummary = r,
        e => this.dialogService.showToast(`Error loading monthly summary.`, "error"),
        () => this.isLoadingSummary = false
      );
  }
}
