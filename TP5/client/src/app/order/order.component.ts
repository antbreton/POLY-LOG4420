import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Order, OrderProduct, OrdersService } from "../orders.service";
import { CartEntry, CartService } from "../cart.service";
import { AppComponent } from '../app.component'

declare const $: any;

/**
 * Defines the component responsible to manage the order page.
 */
@Component({
  selector: 'order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: any;
  order : Order;

  constructor(private OS: OrdersService, private CS: CartService, private router: Router, private app: AppComponent) {
    this.order = new Order();
  }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    // Initializes the validation of the form. This is the ONLY place where jQuery usage is allowed.
    this.orderForm = $('#order-form');
    $.validator.addMethod('ccexp', function(value) {
      if (!value) {
        return false;
      }
      const regEx = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-9][0-9])$/g;
      return regEx.test(value);
    }, 'La date d\'expiration de votre carte de crédit est invalide.');
    this.orderForm.validate({
      rules: {
        'phone': {
          required: true,
          phoneUS: true
        },
        'credit-card': {
          required: true,
          creditcard: true
        },
        'credit-card-expiry': {
          ccexp: true
        }
      }
    });
  }

  /**
   * Submits the order form.
   */
  onSubmit() {
    if (!this.orderForm.valid()) {
      return;
    }

    this.CS.getProductsFromCart().then( cartEntries => {
      for (let cartEntry of cartEntries) {
        let oe = new OrderProduct();
        oe.id = cartEntry.productId;
        oe.quantity = cartEntry.quantity;
        this.order.products.push(oe);
      }

      this.OS.getOrders().then(order => {
        this.order.id = order.length+1;
        this.OS.postOrder(this.order).then(code => {
          if (code == 201) {
	    this.CS.ClearCart();
            this.app.nombreProduits=0;
            this.router.navigate(['/confirmation'], {queryParams : {
              id: this.order.id,
              nom: this.order.firstName + " " + this.order.lastName
            }})
            this.order = new Order();
          }
        })
      })
    })

    return;
  }
}
