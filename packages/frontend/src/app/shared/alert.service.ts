import {Subject} from 'rxjs';
import {Alert} from '../alerts/alert.model';

export class AlertService {
  public alerts: Alert[] = [];
  onChange = new Subject();

  constructor() {}

  addAlert(alert: Alert) {
    this.alerts.push(alert);
    this.deleteAlertAfterTime(alert, this.alerts.length - 1);
    this.onChange.next();
  }

  deleteAlertAfterTime(alert: Alert, index) {
    setTimeout(() => { this.removeAlert(index); }, 3000);
  }

  getAlerts() {
    return this.alerts;
  }

  removeAlert(index: number) {
    this.alerts.splice(index, 1);
    this.onChange.next();
  }

}
