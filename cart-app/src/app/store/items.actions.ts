import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product";

export const cartItemsAdd = createAction('[Cart Items] Add', props<{product: Product}>());
export const cartItemsRemove = createAction('[Cart Items] Remove', props<{id: number}>());
export const cartItemsTotal = createAction('[Cart Items] Total');