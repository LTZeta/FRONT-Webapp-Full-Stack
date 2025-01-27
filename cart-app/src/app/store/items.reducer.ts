import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { cartItemsAdd, cartItemsRemove, cartItemsTotal } from "./items.actions";

export interface ItemsState {
  items: CartItem[],
  total: number
}

const initialState: ItemsState = {
  items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
  total: 0,
}

export const itemsReducer = createReducer(
  initialState,
  on(cartItemsAdd, (state, { product }) => {
    const hasItem = state.items.find((item: CartItem) => item.product.id === product.id)
    if (hasItem) {
      return {
        items: state.items.map((item: CartItem) => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          return item;
        }),
        total: state.total
      }
    } else {
      return {
        items: [...state.items, { product: { ...product }, quantity: 1 }],
        total: state.total
      };
    }
  }),

  on(cartItemsRemove, (state, { id }) => {
    return {
      items: state.items.filter((item: CartItem) => item.product.id !== id),
      total: state.total 
    }
  }),

  on(cartItemsTotal, state => {
    return {
      items: state.items,
      total: state.items.reduce((accumulator: number, item: CartItem) => accumulator + (item.product.price * item.quantity), 0)
    }
  })
)