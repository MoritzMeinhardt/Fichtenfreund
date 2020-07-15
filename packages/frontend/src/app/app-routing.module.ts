import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BloglistComponent} from './bloglist/bloglist.component';
import {BlogDetailComponent} from './bloglist/blog/blog-detail/blog-detail.component';
import {BlogEditComponent} from './bloglist/blog/blog-detail/blog-edit/blog-edit.component';
import {LoginComponent} from './login/login.component';
import {OnlyLoggedInUsersGuardGuard} from './shared/only-logged-in-users-guard.guard';
import {AboutusViewComponent} from './aboutus-view/aboutus-view.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent },
  {path: 'login', component: LoginComponent},
  {path: 'blog', component: BloglistComponent},
  {path: 'blog/new', component: BlogEditComponent, canActivate: [OnlyLoggedInUsersGuardGuard]},
  {path: 'blog/:id', component: BlogDetailComponent},
  {path: 'blog/:id/edit', component: BlogEditComponent, canActivate: [OnlyLoggedInUsersGuardGuard]},
  {path: 'about-us', component: AboutusViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
