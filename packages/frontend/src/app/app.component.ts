import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routerUrl;

  constructor(private router: Router) {
    this.routerUrl = this.router.url;
  }

  ngOnInit(): void {}

  jumpToTop() {
    window.scrollTo(0, 0);
  }
}
