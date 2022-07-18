import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductDataService } from '../../services/data/product-data.service';

@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  private formControlSubscription: Subscription;

  constructor(private fb: FormBuilder, private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      'searchProduct': ['']
    });

    // calls applySearchFilter function upon value change in the form
    this.formControlSubscription = this.searchForm.controls['searchProduct'].valueChanges.subscribe(text => {
      if(text != undefined){
        this.productDataService.applySearchFilter(text);
      }
    });
  }

  ngOnDestroy(): void {
    this.formControlSubscription.unsubscribe();
  }
}
