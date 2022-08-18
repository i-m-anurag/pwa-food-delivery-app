import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  // * GET API CALL
  getData() {
    return this.http.get(environment.FIREBASE_API + '/data.json')
  }

  // * SAVE DATA
  saveData(data: any) {
    return this.http.post(environment.FIREBASE_API + '/order.json', data)
  }

  getorderList() {
    return this.http.get(environment.FIREBASE_API + '/order.json')
  }

  addPushSubscriber(sub: any) {
    return this.http.post("http://localhost:9000/api/notifications", sub);
  }

  send() {
    return this.http.post("http://localhost:9000/api/newsletter", null);
  }

}
