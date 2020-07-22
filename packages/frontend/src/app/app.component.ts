import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routerUrl;
  currentRoute: string;
  @Output() nextRoute: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {
    this.routerUrl = this.router.url;
  }

  ngOnInit(): void {
    // on home-page there is a 100vw margin on the other pages not
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
        this.currentRoute = event.url;
      }
    });
  }

  jumpToTop() {
    window.scrollTo(0, 0);
  }
}
