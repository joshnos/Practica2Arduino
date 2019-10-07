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
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AlarmComponent,
    SettingsComponent,
    IntegrantsComponent,
    WrapperComponent,
    NavBarComponent,
    HomeComponent
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
