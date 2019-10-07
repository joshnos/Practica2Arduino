import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { AlarmComponent } from './components/alarm/alarm.component';
import { SettingsComponent } from './components/settings/settings.component';
import { IntegrantsComponent } from './components/integrants/integrants.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'alarm', component: AlarmComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'integants', component: IntegrantsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
