import { ErrorHandler, NgModule, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DBLoggerService } from '../services/db-logger.service';


@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

  constructor(private _loggerService: DBLoggerService) {
    super();
  }

  handleError(error) {
    this.logError(error);
  }

  logError(error: any) {
    if (error instanceof HttpErrorResponse) {
      this._loggerService.error('There was an HTTP error. Error Message: ' + error.message, (<HttpErrorResponse>error).status);//console.error(date, 'There was an HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
    } else if (error instanceof TypeError) {
      this._loggerService.error('There was a Type error. Error Message: ' + error.message, ',Error stack: ' + error.stack);
    } else if (error instanceof Error) {
      this._loggerService.error('There was a general error. Error Message: ' + error.message, ', Error stack: ' + error.stack);
    } else {
      this._loggerService.error('Nobody threw an Error but something happened!', error.stack);
    }
  }
}
