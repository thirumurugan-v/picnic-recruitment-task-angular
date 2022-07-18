import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogPopupComponent } from '../../components/dialog-popup/dialog-popup.component';
import { Product } from '../../models/product';
import { ScreenSize, ScreenSizeSettings } from '../../models/screen-size';
import { ProductDataService } from '../../services/data/product-data.service';
import { ScreenSizeService } from '../../services/util/screen-size.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  productList: Product[] = [];
  noOfColumnsForProductList: number;
  currentScreenSize: ScreenSize;

  private productDataSubscription: Subscription = new Subscription;
  private screenSizeSubscription: Subscription = new Subscription;

  constructor(
    private productDataService: ProductDataService,
    private screenSizeService: ScreenSizeService,
    private router: Router,
    public dialog: MatDialog) {    }

  ngOnInit(): void {
    this.getProducts();
    this.determineProductListColumns();
  }

  ngOnDestroy(): void {
    this.productDataSubscription.unsubscribe();
    this.screenSizeSubscription.unsubscribe();
  }

  // Get the list of products from the data service.
  private getProducts(){
    this.productDataService.retrieveProductList();

    this.productDataSubscription = this.productDataService.getProductList().subscribe((data) => {
      this.productList = data;
    });
  }


  // subscribes to the screen size changes and sets the no of columns to display.
  private determineProductListColumns(){
    this.screenSizeSubscription = this.screenSizeService.getScreenSize().subscribe((size) => {
      this.currentScreenSize = size;
      switch(size){
        case ScreenSize.mobile:
          this.noOfColumnsForProductList = ScreenSizeSettings.mobileProductColumns;
          break;
        case ScreenSize.tablet:
          this.noOfColumnsForProductList = ScreenSizeSettings.tabletProductColumns;
          break;
        case ScreenSize.desktop:
          this.noOfColumnsForProductList = ScreenSizeSettings.desktopProductColumns;
          break;
      }
    });
  }

  public showProductDetails(productId: string){

    if(this.currentScreenSize == ScreenSize.mobile) {
      // unable to match the route using the router.navigate method, hence redirecting to the hardcoded product url.
      // this.router.navigate(['list', productId]);
      window.location.href = 'http://localhost:4200/picnic/product/list/' + productId;

    } else {
      // assuming that both desktop and table will show the details in the popup
      this.dialog.open(DialogPopupComponent, {
        width: '30%',
        data: {
          dataKey: productId
        }
      });
    }
  }
}
