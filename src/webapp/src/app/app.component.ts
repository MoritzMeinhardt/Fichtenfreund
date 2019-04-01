import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webapp';

  ngOnInit(): void {
  }

  jumpToTop() {
    window.scrollTo(0, 0);
  }
}
