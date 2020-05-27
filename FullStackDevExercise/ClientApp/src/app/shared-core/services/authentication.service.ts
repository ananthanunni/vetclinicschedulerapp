import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class AuthenticationService {

  constructor(private storageService: StorageService) { }

  authenticate(userName: string, password: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.storageService.setValue("userToken", "fakeToken_" + userName + "_" + password)
        resolve(true);
      }, 600);
    });
  }

  signOut() {
    this.storageService.clearValue("userToken");
  }
}
