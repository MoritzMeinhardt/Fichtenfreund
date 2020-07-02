import { Blog } from '../bloglist/blog/blog.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IComment } from '../bloglist/blog/blog-detail/comments/comment.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class BlogService {

  onChangedDetail = new Subject();
  private urlBase = environment.urlBase;

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  getBlogs() {
    return this.http.get(this.urlBase + '/api/blogs');
  }

  getBlog(id: string) {
    return this.http.get(this.urlBase + '/api/blogs/' + id);
  }

  add(newBlog: Blog) {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.post(this.urlBase + '/api/blogs/', newBlog, httpOptions);
  }

  update(id: string, blog: Blog) {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token,
      })
    };
    return this.http.put(this.urlBase + '/api/blogs/' + id, blog, httpOptions);
  }

  delete(id: string) {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token,
      })
    };

    return this.http.delete(this.urlBase + '/api/blogs/' + id, httpOptions);
  }

  addComment(blogId: string, comment: IComment) {
    return this.http.post(`${this.urlBase}/api/blogs/${blogId}/comments/`, comment);
  }

}