import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product";

export const productsFindAll = createAction('[Product] findAll 1');
export const productsFindAll2 = createAction('[Product] findAll 2', props<{ products: Product[] }>());
