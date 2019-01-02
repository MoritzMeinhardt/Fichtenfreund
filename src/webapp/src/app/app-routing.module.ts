import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BloglistComponent} from "./bloglist/bloglist.component";
import {BlogDetailComponent} from "./bloglist/blog/blog-detail/blog-detail.component";
import {BlogEditComponent} from "./bloglist/blog/blog-detail/blog-edit/blog-edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/blog', pathMatch: 'full'},
  {path: 'blog', component: BloglistComponent},
  {path: 'blog/new', component:BlogEditComponent},
  {path: 'blog/:id', component:BlogDetailComponent},
  {path: 'blog/:id/edit', component:BlogEditComponent},
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
