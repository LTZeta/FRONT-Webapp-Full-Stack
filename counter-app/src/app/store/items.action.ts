import { createAction, props } from "@ngrx/store";

export const counterIncrement = createAction('[Counter Component] Increment', props<{add: number}>());
export const counterDecrement = createAction('[Counter Component] Decrement');
export const counterReset = createAction('[Counter Component] Reset');