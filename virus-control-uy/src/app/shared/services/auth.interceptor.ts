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
    const urlGoogle = request.url.substring(0, 27);

    console.log('urlGoogle: ', urlGoogle);
    console.log('es igual: ', urlGoogle === 'https://maps.googleapis.com');

    if (
      request.url !==
        'https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;alpha2Code;alpha3Code;demonym' &&
      urlGoogle !== 'https://maps.googleapis.com'
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
    } else {
      return request;
    }
  }

  private validarUrl(url: string): boolean {
    console.log('validar url: ', url);
    console.log(
      'valida: ',
      url.substring(0, 27) !== 'https://maps.googleapis.com'
    );

    return url.substring(0, 27) !== 'https://maps.googleapis.com';
  }
}
