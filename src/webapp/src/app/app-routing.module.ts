import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BloglistComponent} from "./bloglist/bloglist.component";
import {BlogDetailComponent} from "./bloglist/blog/blog-detail/blog-detail.component";
import {BlogEditComponent} from "./bloglist/blog/blog-detail/blog-edit/blog-edit.component";
import {LoginComponent} from "./login/login.component";
import {OnlyLoggedInUsersGuardGuard} from "./shared/only-logged-in-users-guard.guard";

const routes: Routes = [
  {path: '', redirectTo: '/blog', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'blog', component: BloglistComponent},
  {path: 'blog/new', component:BlogEditComponent, canActivate: [OnlyLoggedInUsersGuardGuard]},
  {path: 'blog/:id', component:BlogDetailComponent},
  {path: 'blog/:id/edit', component:BlogEditComponent, canActivate: [OnlyLoggedInUsersGuardGuard]},
/*  {path: ':category', component: BlogDetailComponent, children: [
      {path: ':id', component: BlogDetailComponent}
    ]},*/
  /*{path: '**', component: BloglistComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
