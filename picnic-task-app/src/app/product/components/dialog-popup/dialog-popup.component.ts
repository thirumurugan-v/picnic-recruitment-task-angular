import { Component, OnDestroy, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ProductDataService } from '../../services/data/product-data.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.css']
})
export class DialogPopupComponent implements OnInit, OnDestroy {

  private productDataSubscription: Subscription;
  product: Product;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  ngOnDestroy(): void {
    this.productDataSubscription.unsubscribe();
  }

  // Get the product details from the data service.
  private getProductDetails(){
    this.productDataService.retrieveProductDetails(this.data["dataKey"]);

    this.productDataSubscription = this.productDataService.getProductDetails().subscribe((data) => {
      this.product = data;
    });
  }

}
