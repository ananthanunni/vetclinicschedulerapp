import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-core-throbber',
  templateUrl: './throbber.component.html',
  styleUrls: ['./throbber.component.scss']
})
export class ThrobberComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input("block")
  block: boolean = false;

  @Input("text")
  text: string = null;

  @Input("size")
  size: number = 24;
}
