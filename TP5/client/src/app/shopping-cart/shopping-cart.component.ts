import { Component } from '@angular/core';
import { Product, ProductsService } from '../products.service';
import { CartService,CartEntry, CartEntryRendered } from '../cart.service';

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})

/**
 * Defines a cartEntryRendered for the view.
 */


export class ShoppingCartComponent {

  cartEntriesRendered : CartEntryRendered [] = new Array<CartEntryRendered>();
 
	constructor(private CS: CartService, private PS: ProductsService) {
    this.requestProducts();
  }

  clicRemove(id : number): void {
		this.CS.removeFromCart(id).then(response =>
		{
			if(response.status == 204)
			{
				for(let i = 0; i<this.cartEntriesRendered.length; i++)
					if(this.cartEntriesRendered[i].product.id==id)
					{
						this.cartEntriesRendered.splice(i,1);
					}
						
			}
		})
  }

	private requestProducts() : void {
    this.CS.getProductsFromCart().then( cartEntries => {
      for (let cartEntry of cartEntries) {
				this.PS.getProduct(Number(cartEntry.productId)).then(
		    product => {
					let cartEntryRendered = new CartEntryRendered();
					cartEntryRendered.product = product;
					cartEntryRendered.quantity = cartEntry.quantity;
		      this.cartEntriesRendered.push(cartEntryRendered);
		    }
		  )
			}
    })
  }
}
