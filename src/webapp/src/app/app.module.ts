import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { BlogComponent } from './bloglist/blog/blog.component';
import { BlogDetailComponent } from './bloglist/blog/blog-detail/blog-detail.component';
import {BlogService} from './shared/blog.service';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';
import { BlogEditComponent } from './bloglist/blog/blog-detail/blog-edit/blog-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CommentsComponent } from './bloglist/blog/blog-detail/comments/comments.component';
import { CommentFormComponent } from './bloglist/blog/blog-detail/comments/comment-form/comment-form.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './shared/auth.service';
import {NgxImageGalleryModule} from 'ngx-image-gallery';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {AlertService} from './shared/alert.service';
import {AlertsComponent} from './alerts/alerts.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    HomeComponent,
    BloglistComponent,
    BlogComponent,
    BlogDetailComponent,
    AboutusComponent,
    FooterComponent,
    BlogEditComponent,
    CommentsComponent,
    CommentFormComponent,
    LoginComponent,
    FileUploadComponent,
    AlertsComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['52.28.221.214', 'localhost:80', 'fichtenfreund.de'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    }),
    NgxImageGalleryModule
  ],
  providers: [
    BlogService,
    AuthService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
