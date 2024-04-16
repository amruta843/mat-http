import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, delay, finalize, takeUntil } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class PostInterseptorService implements HttpInterceptor{
  unsubscribeAll$:Subject<void> = new Subject<void>()

  constructor(
    private _loaderService: LoaderService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderService.loadingState$.next(true)
    return next.handle(req)
                          .pipe(
                            delay(1500),//optional 
                            takeUntil(this.unsubscribeAll$),
                            finalize(()=>{
                              this._loaderService.loadingState$.next(false)
                            })
                          )

  }
  unsubscribAll(){
    this.unsubscribeAll$.next()
    this.unsubscribeAll$.complete()
  }
}
