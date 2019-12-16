import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  alarmTime = "/sensor/setAlarmTime";
  timeOn;
  timeOff;

  constructor(public api: ServicesService) { }

  ngOnInit() {
  }

  createObject() {
    let timeOnTokens = this.timeOn.split(':');
    let timeOffTokens = this.timeOff.split(':');
    return {
      'hourOn': Number(timeOnTokens[0]),
      'minOn': Number(timeOnTokens[1]),
      'hourOff': Number(timeOffTokens[0]),
      'minOff': Number(timeOffTokens[1])
    }
  }

  setTime() {
    console.log(this.timeOn);
    console.log(this.timeOff);
    this.api.putElement(this.alarmTime, this.createObject());
  }

}
