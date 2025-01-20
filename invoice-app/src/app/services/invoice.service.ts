import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { invoiceMock } from '../data/invoice.data';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoice: Invoice = invoiceMock;

  constructor() { }

  getInvoice(): Invoice {
    return this._returnInvoiceAndRecalculateTotal();
  }

  removeItemById(id: number): Invoice {
    this.invoice.items = this.invoice.items.filter(items => items.id != id);
    return this._returnInvoiceAndRecalculateTotal();
  }

  save(item: Item): Invoice {
    this.invoice.items = [...this.invoice.items, item]
    return this._returnInvoiceAndRecalculateTotal();
  }

  _returnInvoiceAndRecalculateTotal(): Invoice {
    const total = this._calculateTotal();
    return {...this.invoice, total};
  }

  _calculateTotal(): number {
    return this.invoice.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
