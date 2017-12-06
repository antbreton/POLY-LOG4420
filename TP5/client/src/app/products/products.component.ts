import { Component } from '@angular/core';
import { Product } from '../products.service';
import { ProductsService } from '../products.service';
import { Order, OrderProduct, OrdersService } from '../orders.service';
import { FormattedPricePipe } from '../formatted-price.pipe';

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {

  products: Product[] = [];
  category: string = "all";
  sorting: string = "price-asc";

  constructor(private PS: ProductsService, private OS: OrdersService) {
    this.requestProducts();
  }

  onCategoryClick(c : string): void {
    if (c == this.category ) return;
    this.category = c;
    this.requestProducts();
  }

  onSortingClick(s : string): void {
    if (s == this.sorting) return;
    this.sorting = s;
    this.requestProducts();
  }

  private requestProducts() : void {
    this.PS.getProducts(this.sorting, this.category).then( products => {
      this.products = products;
    })
  }
  // TODO: À compléter
}
