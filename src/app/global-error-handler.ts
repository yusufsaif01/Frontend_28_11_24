import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (/Loading chunk [\d]+ failed/.test(error.message)) {
      window.location.reload();
    }
  }
}
