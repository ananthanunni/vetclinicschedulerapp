import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedDate: Date;

  constructor() {
  }

  ngOnInit(): void {
    this.selectedDate = new Date();
  }

  selectedDateChange(date:Date): void {
    
  }
}
