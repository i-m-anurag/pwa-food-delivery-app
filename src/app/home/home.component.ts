import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  FoodItem: any[] = [];
  constructor(public api: ApiService, public router: Router) { }

  ngOnInit(): void {
    this.api.getData().subscribe((res: any) => {
      this.FoodItem = res
    })
  }

  placeOrder(id: string) {
    this.router.navigateByUrl('/place-order/' + id)
  }

}
