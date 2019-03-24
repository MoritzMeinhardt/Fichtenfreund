import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  private urlBase = 'http://52.28.221.214:3000';
  //private urlBase = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  authenticate(username: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const user = {
      "username": username,
      "password": password
    };
    return this.http.post(this.urlBase + '/api/users/authenticate', user);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify((user)));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

/*  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }*/

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
