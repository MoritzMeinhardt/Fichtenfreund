import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { BlogComponent } from './bloglist/blog/blog.component';
import { BlogDetailComponent } from './bloglist/blog/blog-detail/blog-detail.component';
import {BlogService} from "./shared/blog.service";
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';
import { BlogEditComponent } from './bloglist/blog/blog-detail/blog-edit/blog-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CommentsComponent } from './bloglist/blog/blog-detail/comments/comments.component';
import { CommentFormComponent } from './bloglist/blog/blog-detail/comments/comment-form/comment-form.component';

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
    CommentFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
