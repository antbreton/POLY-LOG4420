import { Component } from '@angular/core';
import { CartService } from './cart.service'


/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  // TODO: Modifier le nom des auteurs pour vos noms
  readonly authors = [
    'José Apari-Pantigozo',
    'Antoine Breton'
  ];

  nombreProduits : number = 0;

  constructor(private CS: CartService) {
    CS.getProductsFromCart().then(products => {
      this.nombreProduits = products.length;
    });
  }

  onChange() : void {
    console.log("LOOOL");
  }
  // TODO: À compléter
}
