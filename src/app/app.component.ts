import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  version: string = environment.version
  // ! feature 2 codes
  constructor(private swUpdate: SwUpdate) { }

  ngOnInit() {
    // ! feature 2 codes
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((res) => {
        if (confirm("New Version available Load new Version")) {
          window.location.reload();
        }
      });
    }
  }
}
