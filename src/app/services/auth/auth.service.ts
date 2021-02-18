import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor( private http: HttpClient) { }

  login(username, password): Observable<any> {
    return new Observable<any>(observer => { this.http.post(this.apiUrl + '/auth/login', {username, password},  {headers: new HttpHeaders({'Content-Type': 'application/json'})} )
      .toPromise().then(data => {
        this.storeUserToken(data);
        observer.next(data);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
    });
  }
  storeUserToken(token){
    localStorage.setItem('access_token', token.accessToken);

  }
}
