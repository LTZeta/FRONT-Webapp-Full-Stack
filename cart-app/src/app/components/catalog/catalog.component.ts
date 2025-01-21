import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();

  ngOnInit(): void {

  }

  onAddProductOnCart(product: Product): void {
    this.productEventEmitter.emit(product);
  }
}
