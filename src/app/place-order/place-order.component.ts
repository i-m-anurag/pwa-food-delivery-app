import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { ApiService } from '../shared/service/api.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  recipeItemInfo: any;
  lat: any;
  lng: any;
  sub: any;
  readonly VAPID_PUBLIC_KEY =
    'BBOEkq6GqakZMYt7VsKrnyxXAA58ZiJCWTj5xu1jBdq52lAcYYwW1pRU-WFAYu1PT4sMeu0wbNcoBeeifPjLr68';
  constructor(public router: ActivatedRoute, public navRoute: Router, public api: ApiService, private swPush: SwPush) { }

  ngOnInit(): void {
    this.subscribe();
    this.router.paramMap.subscribe(res => {
      if (res.get('id')) {
        this.api.getData().subscribe((resapi: any) => {
          if (res && resapi.find((el: any) => el.id === res.get('id'))) {
            this.recipeItemInfo = resapi.find((el: any) => el.id === res.get('id'))
            console.log(this.recipeItemInfo)
          }
          else {
            this.navRoute.navigateByUrl('')
          }
        })
      }
      else {
        this.navRoute.navigateByUrl('')
      }
    })
  }
  getLocation() {
    // * google api for get geo location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res: any) => {
        console.log('GeoLocation', res)
        // ! setting value in some variable so that we can see it in html ui
        this.lat = res.coords.latitude;
        this.lng = res.coords.longitude;
      })
    } else {
      console.log("Geo Location not supported by browser");
    }
  }

  save() {
    let data = {
      name: this.recipeItemInfo.name,
      id: this.recipeItemInfo.id,
      lat: this.lat,
      lng: this.lng,
      type: 'order'
    }
    console.log(data);
    this.api.saveData(data).subscribe(res => {
      console.log(res);
      this.sendNotification()
      this.navRoute.navigateByUrl('')

    }, (err) => {
      this.backgroundSync()
    })
  }

  subscribe() {

    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY,
        })
        .then((sub) => {
          this.sub = sub;
          console.log("Notification sub", sub);
          this.api.addPushSubscriber(sub).subscribe(
            (res) => {
              console.log("Sent push subscription object to server");
            },
            (err) => {
              console.log("Could not send to server");
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  sendNotification() {
    this.api.send().subscribe(res => {
      console.log(res);
    })
  }

  backgroundSync() {

    navigator.serviceWorker.ready
      .then((swRegistration: any) => swRegistration.sync.register('post-data'))
      .catch(console.log);
  }
}
