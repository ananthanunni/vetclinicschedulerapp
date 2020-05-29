import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class DialogService {
  constructor(private toaster: ToastrService) { }

  showToast(message: string, type: "info" | "success" | "warning" | "error" = "info", title: string = null, duration: number = 3000) {
    switch (type) {
      case "success":
        this.toaster.success(message, title);
        break;

      case "info":
        this.toaster.info(message, title);
        break;

      case "warning":
        this.toaster.warning(message, title);
        break;

      case "error":
        this.toaster.error(message, title);
    }
  }
}
