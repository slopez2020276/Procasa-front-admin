import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private _ngxUiLoaderService: NgxUiLoaderService) {}
	private _activeRequest = 0;

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		console.log('**INGRESANDO AL INTERCEPTOR**');
		if (this._activeRequest === 0) {
			this._ngxUiLoaderService.start();
		}
		this._activeRequest++; //1

		return next.handle(request).pipe(finalize(() => this._stopLoader()));
	}

	private _stopLoader() {
		this._activeRequest--;
		if (this._activeRequest === 0) {
			this._ngxUiLoaderService.stop();
		}
	}
}
