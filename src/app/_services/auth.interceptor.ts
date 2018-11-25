import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from "@angular/core";

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth_token = localStorage.getItem(
      'auth_token'
    );
    if (auth_token){
      console.log(auth_token);
      console.log(typeof auth_token);
      // Clone the request to add the new header
      const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Token ' + auth_token) });

      // Pass the cloned request instead of the original request to the next handle
      return next.handle(clonedRequest);
    } else {
      console.log('No auth_token!');
      return next.handle(req);
    }
  }
}
