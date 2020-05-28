import { Component, OnInit } from '@angular/core';
import { MetaService } from '../../../shared-core/services/meta.service';

@Component({
  selector: 'owners-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private meta:MetaService) { }

  ngOnInit(): void {
    this.meta.setTitle("Owner Management");
  }

}
