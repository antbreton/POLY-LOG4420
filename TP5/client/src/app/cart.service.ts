import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Product, ProductsService } from './products.service';
import { Config } from './config';

/**
 * Defines a cartEntry for the API.
 */
export class CartEntry  {
  productId: number;
  quantity: number;
}

export class CartEntryRendered  {
  quantity: number;
  product : Product;
}
/**
 * Defines the service responsible to retrieve the products in the database.
 */
@Injectable()
export class CartService {

  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers, withCredentials:true});
  /**
   * Handles the current error.
   *
   * @param error                   The error to handle.
   * @return {Promise<object>}      A promise object.
   */
  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.feedbackMessage || error);
  }

  /**
   * Initializes a new instance of the ProductsService class.
   *
   * @param http                    The HTTP service to use.
   */
  constructor(private http: Http) { }

  /**
   * Gets all the products in the database.
   *
   * @param [sortingCriteria]       The sorting criteria to use. If no value is specified, the list returned isn't sorted.
   * @param [category]              The category of the product. The default value is "all".
   * @return {Promise<CartEntry[]>}   The category of the product. The default value is "all".
   */
  getProductsFromCart(): Promise<CartEntry[]> {
    let url = `${Config.apiUrl}/shopping-cart`;


    return this.http.get(url, this.options)
      .toPromise()
      .then(cartentry => cartentry.json() as CartEntry[])
      .catch(CartService.handleError);
  }

  addToCart(c : CartEntry): Promise<Response> {
    let url = `${Config.apiUrl}/shopping-cart`;
	return this.http.post(url, JSON.stringify(c), this.options).toPromise()
	  .then(response => response as Response)
      .catch(CartService.handleError);
  }

  updateQty(productId : number, qty : number): Promise<Response> {
    let url = `${Config.apiUrl}/shopping-cart/${productId}`;
	return this.http.put(url, JSON.stringify({quantity:qty}), this.options).toPromise()
	  .then(response => response as Response)
      .catch(CartService.handleError);
  }

  ClearCart(): Promise<Response> {
    let url = `${Config.apiUrl}/shopping-cart`;
	return this.http.delete(url,  this.options).toPromise()
	  .then(response => response as Response)
      .catch(CartService.handleError);
  }

  removeFromCart(id : number): Promise<Response> {
    let url = `${Config.apiUrl}/shopping-cart/${id}`;
	return this.http.delete(url, this.options).toPromise()
	  .then(response => response as Response)
      .catch(CartService.handleError);
  }

}
