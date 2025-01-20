import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'form-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-item.component.html'
})
export class FormItemComponent {

  @Output() addItemEventEmmiter = new EventEmitter();

  private counterId = 4;

  item: any = {
    product: '',
    price: '',
    quantity: '',
  }

  addItemToInvoice(itemForm: NgForm): void {
    this.addItemEventEmmiter.emit({ id: this.counterId, ...this.item });
    this.counterId++;
    this._resetForm(itemForm);
  }

  _resetForm(itemForm: NgForm): void {
    this.item = {
      product: '',
      price: '',
      quantity: '',
    }
    itemForm.reset();
    itemForm.resetForm();
  }
}
