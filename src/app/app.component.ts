import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Client';
  displayedBidColumns: string[] = ['size', 'bid'];
  displayedAskColumns: string[] = ['ask', 'size']
  dataBidSource = ELEMENT_DATA;
  dataAskSource = ELEMENT_DATA;

  totalBidPriceSize = 0;
  totalAskSize = 0;

  constructor(private appSerivce: AppService) {
    this.getPrices();
  }

  ngOnInit(): void {
    interval(30000).subscribe(() => {
      this.getPrices();
  });
  }

  getPrices() {
    this.appSerivce.getPrices().subscribe(
      (data: any) => {
        this.dataBidSource = data.bid.listBid;
        this.dataAskSource = data.ask.listAsk;
        this.totalBidPriceSize = data.bid.total;
        this.totalAskSize = data.ask.total;
      },
      (err) => {
        console.log(err)
      }
    )
  }

}

export interface BitElement {
  size: number,
  price: string
}

const ELEMENT_DATA: BitElement[] = [];
