import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { cartItemsAdd, cartItemsRemove, cartItemsTotal } from '../store/items.actions';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];

  constructor(private store: Store<{ itemsReducer: ItemsState }>, private sharingDataService: SharingDataService, private router: Router) {

    this.store.select('itemsReducer').subscribe(state => {
      this.items = state.items;
      this._saveSession();
    })

  }

  ngOnInit(): void {

    this.store.dispatch(cartItemsTotal());
    this.onDeleteProductOnCart();
    this.onAddProductOnCart();

  }

  onAddProductOnCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(product => {

      this.store.dispatch(cartItemsAdd({ product }));
      this.store.dispatch(cartItemsTotal());

      this.router.navigate(['/cart']);

      Swal.fire({
        title: "Shopping",
        text: product.name + " agregado con éxito",
        icon: "success"
      });

    })
  }

  onDeleteProductOnCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe(id => {

      const itemToDelete = this.items.find(item => item.product.id === id);

      Swal.fire({
        title: "¿Estas seguro que desea eliminar " + itemToDelete?.product.name + " del carro?",
        text: "Se eliminaran el total de cantidades del producto (" + itemToDelete?.quantity + ")",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar del carro!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(cartItemsRemove({ id }));
          this.store.dispatch(cartItemsTotal());
          this.router.navigate(['/cart']);


          Swal.fire({
            title: "Eliminado!",
            text: "El " + itemToDelete?.product.name + " fue eliminado del carro.",
            icon: "success"
          });

        }
      });
    });
  }


  _saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
