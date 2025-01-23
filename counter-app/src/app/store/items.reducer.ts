import { createReducer, on } from "@ngrx/store";
import { counterDecrement, counterIncrement, counterReset } from "./items.action";

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(counterIncrement, (state, {add}) => state + add),
  on(counterDecrement, (state) => state - 1),
  on(counterReset, () => 0),
);

