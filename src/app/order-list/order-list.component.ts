import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/service/api.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList: any;
  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.api.getorderList().subscribe((res: any) => {
      this.orderList = Object.keys(res).map(el => {
        return {
          order_id: el,
          id: res[el].id,
          name: res[el].name,
          lat: res[el].lat,
          lng: res[el].lng,


        }
      })
      console.log(this.orderList)
    })

  }

}
