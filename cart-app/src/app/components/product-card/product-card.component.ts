import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'div[product-card]',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  @Input() product: Product = new Product();
  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();

  onAddProductOnCart(product: Product): void {
    this.productEventEmitter.emit(product);
  }
}
