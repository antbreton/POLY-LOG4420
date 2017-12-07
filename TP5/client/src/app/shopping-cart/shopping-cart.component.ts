import { Component, Output, EventEmitter } from '@angular/core';
import { Product, ProductsService } from '../products.service';
import { CartService,CartEntry, CartEntryRendered } from '../cart.service';
import { FormattedPricePipe } from "../formatted-price.pipe";
import { AppComponent } from "../app.component";
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
  total : number;

	constructor(private CS: CartService, private PS: ProductsService, private app: AppComponent) {
    this.requestProducts();
    this.computeNbProduct();
  }

  computeTotal()
  {
    let sum =0;
    for(let i = 0; i<this.cartEntriesRendered.length; i++)
      sum+=this.cartEntriesRendered[i].quantity*this.cartEntriesRendered[i].product.price;

    this.total = sum;
  }

  clicRemove(id : number): void {
	if(confirm("Voulez-vous supprimer le produit du panier ?"))
	{
		this.CS.removeFromCart(id).then(response =>
		{
			if(response.status == 204)
			{
				for(let i = 0; i<this.cartEntriesRendered.length; i++)
					if(this.cartEntriesRendered[i].product.id==id)
					{
						this.cartEntriesRendered.splice(i,1);
					}
        this.computeTotal();
	this.computeNbProduct();
			}
		})
	}
  }

  computeNbProduct(): number {
  	let sum = 0;
	for(let cartEntry of this.cartEntriesRendered)
	{
		sum+=cartEntry.quantity;
	}
	this.app.nombreProduits=sum;
	return sum;
  }

  clicUpdateQty(id : number, newQty : number): void {
		this.CS.updateQty(id, newQty).then(response =>
		{
			if(response.status == 204)
			{
				for(let i = 0; i<this.cartEntriesRendered.length; i++)
					if(this.cartEntriesRendered[i].product.id==id)
					{
						this.cartEntriesRendered[i].quantity = newQty;

					}
        this.computeTotal();
	this.computeNbProduct();
			}
		})
  }



  clicClear(): void {
	if(confirm("Voulez-vous supprimer tous les produits du panier ?"))
	{
		this.CS.ClearCart().then(response =>
		{
      if(response.status == 204)
      {
        this.cartEntriesRendered = new Array<CartEntryRendered>();
        this.computeTotal();
        this.computeNbProduct();
      }
    })
}
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
          this.computeTotal();
          this.computeNbProduct();
        })
			}
    })
  }
}
