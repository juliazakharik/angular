import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import {WebSocketAPI} from "./WebSocketAPI";
import {MapComponent} from "./map/map.component";
import { CoordinatesComponent } from './coordinates/coordinates.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CoordinatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
