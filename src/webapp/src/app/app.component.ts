import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'webapp';

  showAboutUs = true;

  onResize() {
    console.log(window.innerWidth + ' ' + window.outerWidth + ' ' );
    if (window.innerWidth > 1200) {
      this.showAboutUs = true;
    } else {
      this.showAboutUs = false;
    }
    /*window.innerWidth > 1200 ? this.showMe = true : this.showMe = false;*/
  }

  ngOnInit(): void {
    this.onResize();
  }

  onActivate(event) {
    window.scrollTo(0, 0);
  }
}
