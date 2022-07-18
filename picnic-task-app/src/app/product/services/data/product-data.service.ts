import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { ProductDto, ProductListDto } from '../../models/product-list-dto';
import { ProductHttpService } from '../http/product-http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private productDetails$: BehaviorSubject<Product> = new BehaviorSubject<Product>(undefined);
  private productList: Product[] = [];
  private productListSubscription: Subscription = new Subscription;
  private productDetailSubscription: Subscription = new Subscription;

  constructor(private productHttpService: ProductHttpService) { }

  // make the api call and publish the response to the product list observable.
  public retrieveProductList(){
    this.productListSubscription = this.productHttpService.getProductList().subscribe((result: ProductListDto) => {
      result.products.forEach(item => {
        var product: Product = {
          id: item.product_id,
          name: item.name,
          price: item.price,
          imageURL: item.image
        };
        this.productList.push(product);
      });

      this.productList$.next(this.productList);
    });
  }

  // make the api call and publish the response to the product details observable.
  public retrieveProductDetails(productId: string){
    this.productDetailSubscription = this.productHttpService.getProductDetails(productId).subscribe((result: ProductDto) => {
        var productDetails: Product = {
          id: result.product_id,
          name: result.name,
          price: result.price,
          imageURL: result.image,
          description: result.description
        };
        this.productDetails$.next(productDetails);
    });
  }

  // returns the product list as the observable
  public getProductList(): Observable<Product[]> {
    return this.productList$.asObservable();
  }

  // returns the product details as the observable
  public getProductDetails(): Observable<Product> {
    return this.productDetails$.asObservable();
  }

  // applies contains filter to the name of the product list.
  public applySearchFilter(nameFilter: string){
    if(nameFilter != undefined){
      var filteredProducts = this.productList.filter((x) => x.name.toLowerCase().includes(nameFilter.toLowerCase()))
      this.productList$.next(filteredProducts);
    }
  }
}
