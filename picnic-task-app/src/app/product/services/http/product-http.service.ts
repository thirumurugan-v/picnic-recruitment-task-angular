import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDto, ProductListDto } from '../../models/product-list-dto';
import { Observable } from 'rxjs';
import { ConfigService } from '../util/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {

  private apiBaseURL: string;

  constructor( private httpClient: HttpClient, private configService: ConfigService) {
    this. apiBaseURL = this.configService.apiBaseUrl;
  }

  // makes http get api call to get the product list dto
  public getProductList(): Observable<ProductListDto>{
    var apiURL = this.apiBaseURL + '/cart/list';

    return this.httpClient.get<ProductListDto>(apiURL);
  }

  // makes http get api call to get the product list dto
  public getProductDetails(productId: string): Observable<ProductDto>{
    var apiURL = this.apiBaseURL + '/cart/' + productId + '/detail';

    return this.httpClient.get<ProductDto>(apiURL);
  }
}


// {
//   "products" : [
//      {
//         "product_id" : "1",
//         "name" : "Apples",
//         "price" : 120,
//         "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/1.jpg"
//      },
//      {
//         "product_id" : "2",
//         "name" : "Oranges",
//         "price" : 167,
//         "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/2.jpg"
//      },
//      {
//         "product_id" : "3",
//         "name" : "Bananas",
//         "price" : 88,
//         "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/3.jpg"
//      },
//      {
//         "product_id" : "4",
//         "name" : "Onions",
//         "price" : 110,
//         "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/4.jpg"
//      },
//      {
//         "product_id" : "5",
//         "name" : "Steak",
//         "price" : 543,
//         "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/5.jpg"
//      },
//      {
//         "product_id" : "6_id_is_a_string",
//         "name" : "Pork",
//         "price" : 343,
//         "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/6.jpg"
//      },
//      {
//         "product_id" : "7",
//         "name" : "Chicken",
//         "price" : 272,
//         "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/chicken.jpg"
//      },
//      {
//         "product_id" : "8",
//         "name" : "Salmon",
//         "price" : 267,
//         "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/8.jpg"
//      },
//      {
//         "product_id" : "9",
//         "name" : "Tuna",
//         "price" : 557,
//         "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/9.jpg"
//      },
//      {
//         "product_id" : "10",
//         "name" : "Broccoli",
//         "price" : 32,
//         "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/10.jpg"
//      },
//      {
//         "product_id" : "11",
//         "name" : "Bacon",
//         "price" : 212,
//         "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/11.jpg"
//      },
//      {
//         "product_id" : "12",
//         "name" : "Peppers",
//         "price" : 9,
//         "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/12.jpg"
//      }
//   ]
// }


    //  {
    //     "product_id" : "1",
    //     "name" : "Apples",
    //     "price" : 120,
    //     "image" : "https://s3-eu-west-1.amazonaws.com/developer-application-test/images/1.jpg",
    //     "description" : "An apple a day keeps the doctor away."
    //  }
