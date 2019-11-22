import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  public url = "/sensor/status";
  encendido = {
    "status": 1
  }

  apagado = {
    "status": 0
  }

  constructor(public api: ServicesService) {}

  ngOnInit() {
  }

  turnOn() {
    this.api.putElement(this.url, this.encendido);
  }

  turnOff() {
    this.api.putElement(this.url, this.apagado);
  }

}
