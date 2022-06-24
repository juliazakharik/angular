import {Component, SimpleChanges} from '@angular/core';
import { WebSocketAPI } from './WebSocketAPI';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular8-springboot-websocket';

    webSocketAPI!:  WebSocketAPI;
    greeting: any;
    router!: Router;
    route!: ActivatedRoute;
    name!: string;
    change!: SimpleChanges;
    ngOnInit() {
      this.webSocketAPI = new WebSocketAPI(new AppComponent());
    }

    connect(){
      this.webSocketAPI._connect();
    }

    disconnect(){
      this.webSocketAPI._disconnect();
    }

    sendMessage(){
      this.webSocketAPI._send(this.name);
    }
    ngOnChanges(changes: SimpleChanges) {
      console.log(changes)
    }

    handleMessage(message:any){
      this.greeting = message;
      // const prevConfiguration = this.router.routeReuseStrategy.shouldReuseRoute;
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      // this.router.onSameUrlNavigation = "reload";
      // this.router.navigate(["./"], { relativeTo: this.route }).then(() => {
      //   this.router.routeReuseStrategy.shouldReuseRoute = prevConfiguration;
      //   this.router.onSameUrlNavigation = "ignore";
      // });
    }
}
