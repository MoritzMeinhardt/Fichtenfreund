import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  private urlBase = environment.urlBase;

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
    return localStorage.getItem('id_token');
  }

/*  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }*/

  public isAuthenticated(): boolean {
    return this.authToken !== null; // TODO need condition if token is expired
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
