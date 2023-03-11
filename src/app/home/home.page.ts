import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { distinctUntilChanged, map, mergeMap, switchMap } from 'rxjs/operators';
import { MachineApiService, Product } from '../api/machine-api.service';
import { CardCounterService } from '../components/card/card-counter.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  freshProducts: Product[];
  isLoading: boolean = true;
  storedCounter: any;

  constructor(
    private machineApi: MachineApiService,
    private counterSvc: CardCounterService
  ) { }

  async ngOnInit() {
    const storedCounter = this.counterSvc.initVoteCounter();
    interval(5000).pipe(
      mergeMap(() => this.machineApi.getMachine()),
      map(value => value.data.machineProducts),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    ).subscribe(response => {
      this.freshProducts = response
        .filter(product => !storedCounter?.swipedIds.includes(product.id));
      this.isLoading = false;
    });
  };

  async initProducts() {
    const response = await this.machineApi.getMachine().toPromise();
    const products = response.data?.machineProducts;
    
    return products.filter(x => x.attributesMap.freshProduct.value);
  }

  async onReset() {
    this.isLoading = true;
    this.freshProducts = await this.initProducts();
    this.counterSvc.removeVoteCounter();
    this.isLoading = false;
  }
}
