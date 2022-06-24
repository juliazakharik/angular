import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from './app.component';
import {Router} from "@angular/router";

export class WebSocketAPI {
  webSocketEndPoint: string = 'http://localhost:9000/ws';
  topic: string = "/map/coordinates";
  stompClient: any;
  appComponent: AppComponent;
  router!: Router;
  constructor(appComponent: AppComponent){
    this.appComponent = appComponent;
  }
  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    _this.stompClient.connect({}, function (frame : any) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent:any) {
        _this.onMessageReceived(sdkEvent);
        // _this.router.navigated = false;
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);

  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // onClick(): void {
  //   this.stompClient.subscribed = this.http.get('http://localhost:8080/test', {responseType: 'text'})
  //     .subscribe(data => this.message = data);
  // }

  // on error, schedule a reconnection attempt
  errorCallBack(error:any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message:any) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }

  onMessageReceived(message:any) {
    console.log("Message Recieved from Server :: " + message);
    // angular.runChangeDetection()
    this.appComponent.handleMessage(JSON.stringify(message.body));
  }
}
