import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-core-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
  }

  get year() { return new Date().getFullYear(); }
}
