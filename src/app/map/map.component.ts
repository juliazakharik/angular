import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WebSocketAPI } from '../WebSocketAPI';
import {Coordinates} from "../model/map.model";
import {User} from "../model/user.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent{
  displayedColumns: string[] = ['id', 'number', 'type', 'created', 'modified', 'action'];

  // vehicleForm = new FormGroup({
  //   number: new FormControl(null),
  //   type: new FormControl(null)
  // });
  //
  coordinates:Coordinates[] = [];
  users:User[] = [];
  //
  constructor(private http: HttpClient, private webSocketAPI: WebSocketAPI) {
    this.refreshCoordinates();
  }
  //
  ngOnInit(): void {
    // Load all vehicle types
    this.webSocketAPI.stompClient.subscribe('map/map', (): any => {
      this.refreshCoordinates();
    });
  }

  private refreshCoordinates(): void {
    this.http.get<Coordinates[]>('/users').subscribe(((response:User[]) => {this.users = response;}))
  }

}
