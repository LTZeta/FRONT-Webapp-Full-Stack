import { createReducer, on } from "@ngrx/store"
import { productsFindAll, productsFindAll2 } from "./producs.actions"

const products: any[] = [];

const initialState = {
  products
}

export const productsReducer = createReducer(
  initialState,
  on(productsFindAll, (state) => ({ products: [...state.products] })),
  on(productsFindAll2, (state, { products }) => ({ products: [...products] })),

)