import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem("token")) {
            const authHeader = req.clone({
                headers: req.headers.set(
                    "X-AUTH-HEADER", 
                    localStorage.getItem("token"))
            })
            req = authHeader
        }
        return next.handle(req).pipe(
        tap(event => this.haldleResponose(req, event),
             error => this.haldleError(req, error)));
    }

    haldleResponose(req: HttpRequest<any>, event){
        console.log('handling response for ', req.url, event)
        if(event instanceof HttpResponse){
            console.log('request for ', req.url, ' response status ', event.status, ' with body ', event.body);

        }
    }

    haldleError(req: HttpRequest<any>, event){
        console.log('request for ', req.url, ' response status ', event.status, ' with error ', event.error);

        
    }

}