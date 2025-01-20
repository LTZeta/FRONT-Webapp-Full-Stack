import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';
import { RowItemComponent } from '../row-item/row-item.component';

@Component({
  selector: 'list-items',
  standalone: true,
  imports: [RowItemComponent],
  templateUrl: './list-items.component.html'
})
export class ListItemsComponent {
  @Input() items: Item[] = []

  @Output() removeEventEmmiter: EventEmitter<number> = new EventEmitter();
  removeItem(id: number): void {
    this.removeEventEmmiter.emit(id);
  }
}
