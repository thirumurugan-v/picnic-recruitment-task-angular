import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductComponent } from './pages/product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogPopupComponent } from './components/dialog-popup/dialog-popup.component';

const routes: Routes = [
  {
    path: 'list',
    component: ProductListComponent
  },
  {
    path: 'list/:id',
    component: ProductComponent
  }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [ProductListComponent, ProductComponent, SearchProductComponent, DialogPopupComponent],
  exports: [RouterModule]
})
export class ProductModule { }
