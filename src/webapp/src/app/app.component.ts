import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webapp';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  jumpToTop() {
    window.scrollTo(0, 0);
  }
}
