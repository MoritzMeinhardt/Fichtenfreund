import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pathToLogo: string = environment.urlBase + '/images/logo.svg';
  currentRoute: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd ) {
        this.currentRoute = event.url;
      }
    });
  }

}
