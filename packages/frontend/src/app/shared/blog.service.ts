import { Blog } from '../bloglist/blog/blog.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IComment } from '../bloglist/blog/blog-detail/comments/comment.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Page } from '../bloglist/blog/page.model';

@Injectable()
export class BlogService {

  private urlBase = environment.urlBase;

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  getBlogs(pageNo: number, size: number) {
    return this.http.get(this.urlBase + '/api/blogs', {params: new HttpParams().set('page', '' + pageNo).append('size', '' + size)});
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
