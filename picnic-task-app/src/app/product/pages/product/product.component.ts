import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { ProductDataService } from '../../services/data/product-data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  private productDataSubscription: Subscription;
  private productId: string;
  product: Product;

  constructor(private activatedRoute: ActivatedRoute, private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.productDataSubscription.unsubscribe();
  }

  // Get the product details from the data service.
  private getProductDetails(){
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
      this.productDataService.retrieveProductDetails(this.productId);
    });

    this.productDataSubscription = this.productDataService.getProductDetails().subscribe((data) => {
      this.product = data;
    });
  }
}
