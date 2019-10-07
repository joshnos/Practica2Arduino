import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { AlarmComponent } from './components/alarm/alarm.component';
import { SettingsComponent } from './components/settings/settings.component';
import { IntegrantsComponent } from './components/integrants/integrants.component';
import { WrapperComponent } from './components/core/wrapper/wrapper.component';
import { SidebarComponent } from './components/core/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AlarmComponent,
    SettingsComponent,
    IntegrantsComponent,
    WrapperComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
