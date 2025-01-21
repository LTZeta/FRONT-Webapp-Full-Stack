import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnChanges {
  total: number = 0;
  @Input() items: CartItem[] = [];
  @Output() idProductEventEmitter = new EventEmitter();


  ngOnChanges(): void {
    this._calculateTotal();
    this._saveSession();
  }

  onDeleteProductOnCart(id: number): void {
    this.idProductEventEmitter.emit(id);
  }

  _calculateTotal(): void {
    this.total = this.items.reduce((accumulator, item) => accumulator + (item.product.price * item.quantity), 0);
  }

  _saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
