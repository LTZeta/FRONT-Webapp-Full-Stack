import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { productsFindAll } from '../../store/producs.actions';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})

export class CatalogComponent implements OnInit {
  products!: Product[];

  constructor(private store: Store<{ productsReducer: any }>, private sharingDataService: SharingDataService) {
    this.store.select('productsReducer').subscribe(state => this.products = state.products)
  }

  ngOnInit(): void {
    this.store.dispatch(productsFindAll());
  }

  onAddProductOnCart(product: Product): void {
    this.sharingDataService.productEventEmitter.emit(product);
  }

}
