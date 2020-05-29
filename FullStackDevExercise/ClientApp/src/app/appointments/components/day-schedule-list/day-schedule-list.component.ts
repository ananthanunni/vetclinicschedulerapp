import { Component, OnInit, Input } from '@angular/core';
import { DateTimeService } from '../../services/date-time.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'appointments-day-schedule-list',
  templateUrl: './day-schedule-list.component.html',
  styleUrls: ['./day-schedule-list.component.css']
})
export class DayScheduleListComponent implements OnInit {

  constructor(private dateTimeService:DateTimeService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    
  }

  @Input("date")
  selectedDate: Date;

  get selectedDateDisplay() { return this.sanitizer.bypassSecurityTrustHtml( this.dateTimeService.toFriendlyDateDisplay(this.selectedDate));}
}
