import { Component, OnInit } from '@angular/core';
import { WebSocketAPI } from '../WebSocketAPI';
import {Coordinates} from "../model/map.model";
import {User} from "../model/user.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.css']
})
export class CoordinatesComponent implements OnInit {
  coordinates:Coordinates[] = [];
  users:User[] = [];

  constructor(private http: HttpClient, private webSocketAPI: WebSocketAPI) {
    this.refreshCoordinates();
  }

  ngOnInit(): void {
    this.webSocketAPI.stompClient.subscribe('map/map', (): any => {
      this.refreshCoordinates();
    });
  }

  private refreshCoordinates(): void {
    this.http.get<Coordinates[]>('/users').subscribe(((response:User[]) => {this.users = response;}))
  }

}
