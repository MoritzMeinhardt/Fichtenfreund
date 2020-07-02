import { Component, OnInit } from '@angular/core';
import {AlertService} from '../shared/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  private subAlerts;
  public alerts = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subAlerts = this.alertService.onChange.subscribe((next) => { this.alerts = this.alertService.getAlerts(); });
  }

  onClose(index: number) {
    this.alertService.removeAlert(index);
  }
}
