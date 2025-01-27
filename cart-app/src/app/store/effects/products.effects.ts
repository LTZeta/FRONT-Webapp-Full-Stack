import { Injectable } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { productsFindAll, productsFindAll2 } from "../producs.actions";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(
    () => this.actions$.pipe(
      ofType(productsFindAll),
      exhaustMap(() => this.service.findAll())
    ).pipe(
      map(products => productsFindAll2({ products })),
      catchError(()=> EMPTY)
    )
  );

  constructor(private actions$: Actions, private service: ProductService) {

  }
}