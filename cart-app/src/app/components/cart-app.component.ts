import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];
  total: number = 0;

  constructor(private sharingDataService: SharingDataService, private router: Router) { }

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this._calculateTotal();
    this.onDeleteProductOnCart();
    this.onAddProductOnCart();
  }

  onAddProductOnCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(product => {
      const hasItem = this.items.find(item => item.product.id === product.id)
      if (hasItem) {
        this.items = this.items.map(item => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          return item;
        })
      } else {
        this.items = [...this.items, { product: { ...product }, quantity: 1 }];
      }
      this._calculateTotal();
      this._saveSession();
      this.router.navigate(['/cart'], {
        state: {
          items: this.items,
          total: this.total,
        }
      })

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
        title: "¿Estas seguro que desea eliminar "+ itemToDelete?.product.name + " del carro?",
        text: "Se eliminaran el total de cantidades del producto ("+ itemToDelete?.quantity +")",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar del carro!"
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.items = this.items.filter(item => item.product.id !== id);
          if (this.items.length === 0) {
            sessionStorage.removeItem('cart');
          }
          this._calculateTotal();
          this._saveSession();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart'], {
              state: { items: this.items, total: this.total, }
            });
          });
          Swal.fire({
            title: "Eliminado!",
            text: "El "+ itemToDelete?.product.name +" fue eliminado del carro.",
            icon: "success"
          });
        }
      });
    });
  }

  _calculateTotal(): void {
    this.total = this.items.reduce((accumulator, item) => accumulator + (item.product.price * item.quantity), 0);
  }

  _saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
