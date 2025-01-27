import { Component } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent{
  total: number = 0;
  items: CartItem[] = [];

  constructor(private store: Store<{ itemsReducer: ItemsState }>, private sharingDataServices: SharingDataService) {
    this.store.select('itemsReducer').subscribe(state => {
      this.items = state.items;
      this.total = state.total;
    })
  }

  onDeleteProductOnCart(id: number): void {
    this.sharingDataServices.idProductEventEmitter.emit(id);
  }

}