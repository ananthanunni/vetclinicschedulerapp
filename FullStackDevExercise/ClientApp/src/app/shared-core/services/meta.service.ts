import { Injectable } from '@angular/core';
import { AppConstants } from '../../AppConstants';
import { Title } from '@angular/platform-browser';

@Injectable()
export class MetaService {
  constructor(private title: Title) { }

  setTitle(title: string) {
    this.title.setTitle(`${title} - ${AppConstants.appName}`);
  }
}
