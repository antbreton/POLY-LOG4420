import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Config } from './config';

/**
 * Defines a product.
 */


//TODO: Replace with CartProduct
export class OrderProduct {
  id: number;
  quantity: number;
}

export class Order {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  products: OrderProduct[] = new Array<OrderProduct>();
}

/**
 * Defines the service responsible to retrieve the products in the database.
 */
@Injectable()
export class OrdersService {
  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.feedbackMessage || error);
  }

  constructor(private http: Http) { }

  getOrders(): Promise<Order[]> {
    let url = `${Config.apiUrl}/orders`;
    return this.http.get(url)
      .toPromise()
      .then(orders => orders.json() as Order[])
      .catch(OrdersService.handleError);
  }

  getOrder(orderId: number): Promise<Order> {
    const url = `${Config.apiUrl}/orders/${orderId}`;
    return this.http.get(url)
      .toPromise()
      .then(order => order.json() as Order)
      .catch(() => null);
  }

  postOrder(order: Order): Promise<number> {
    const url = `${Config.apiUrl}/orders/`;
    return this.http.post(url, order)
      .toPromise()
      .then(r => r.status)
      .catch(r => r.status)
  }

  deleteOrder(orderId: number): Promise<number> {
    const url = `${Config.apiUrl}/orders/${orderId}`;
    return this.http.delete(url)
      .toPromise()
      .then(r => r.status)
      .catch(r => r.status)
  }

  deleteOrders(): Promise<number> {
    const url = `${Config.apiUrl}/orders/`;
    return this.http.delete(url)
      .toPromise()
      .then(r => r.status)
      .catch(r => r.status)
  }
}
