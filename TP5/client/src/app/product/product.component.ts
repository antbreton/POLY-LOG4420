import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, ProductsService } from '../products.service';
import { Observable } from "rxjs/Rx"
import { trigger, state, style, animate, transition } from '@angular/animations';

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  animations: [
    trigger('displayToast', [
      state('false', style({
        display:"none",
        opacity: 0
      })),
      state('true',   style({
        display:"block",
        opacity: 1
      })),
      transition('false => true', animate('350ms ease-in')),
      transition('true => false', animate('350ms ease-out'))
    ])
  ]

})
export class ProductComponent implements OnInit {

  product : Product = null;
  quantity : Number = 1;
  toast : Boolean = false;

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private router: Router, private route: ActivatedRoute, private PS: ProductsService) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    // TODO: Compléter la logique pour afficher le produit associé à l'identifiant spécifié (productId).
    this.PS.getProduct(Number(productId)).then(
      success => {
        this.product = success;
      },
      fail => {
        this.product = null;
      }
    )
  }

  onAdd(): void {
    // TODO: Call Cart Service to add product


    this.toast = true;
    let timer = Observable.timer(5000);
    timer.subscribe(t => {
      this.toast = false;
    });
  }
}
