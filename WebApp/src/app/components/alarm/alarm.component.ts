import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  public url = "/sensor/status";

  constructor(public api: ServicesService) {}

  ngOnInit() {
  }

  turnOn() {
    this.api.putElement(this.url,{"status": 1});
  }

  turnOff() {
    this.api.putElement(this.url,{"status": 0});
  }

}
