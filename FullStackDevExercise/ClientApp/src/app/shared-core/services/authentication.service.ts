import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  constructor(private storageService: StorageService) {
    this.authenticatedUser.next(this.storageService.getValue("userName"));
  }

  authenticate(userName: string, password: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        // we dont really care about password
        this.storageService.setValue("userName", userName);
        this.storageService.setValue("userToken", "fakeToken_" + userName)
        resolve(true);
        this.authenticatedUser.next(userName);
      }, 600);
    });
  }

  authenticatedUser = new BehaviorSubject<string>(null);
  isAuthenticated = this.authenticatedUser.pipe(map(r => !!r));

  signOut() {
    this.storageService.clearAll();
    this.authenticatedUser.next(null);
  }
}
