import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  getValue(key: string) {
    return localStorage.getItem(key);
  }

  setValue(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  clearValue(key: string) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}
