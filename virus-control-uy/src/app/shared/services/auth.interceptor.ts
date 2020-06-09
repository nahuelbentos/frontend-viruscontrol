import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private autenticacionService: AutenticacionService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>) {
    
    // console.log('request', request);
    if ( request.url !==
      'https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;alpha2Code;alpha3Code;demonym'
    ) {
      if (this.autenticacionService.user) {
        const token = this.autenticacionService.user.sessionToken;
        console.log('token', token);
        if (token) {
          request = request.clone({
            setHeaders: {
              authorization: token,
            },
          });
          return request;
        }
      }
      return request;
    }else{
      return request;

    }
    
  }

}
