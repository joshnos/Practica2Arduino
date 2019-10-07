import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  frecuencyUrl = "/buzzer/frecuency";
  limitUrl = "/sensor/limit";
  frecuency = 0;
  limit = 0;

  constructor(public api: ServicesService) { }

  ngOnInit() {
  }

  setFrecuency() {
    this.api.putElement(this.frecuencyUrl, {"frecuency": this.frecuency});
  }

  setLimit() {
    this.api.putElement(this.limitUrl, {"limit": this.limit});
  }

}
