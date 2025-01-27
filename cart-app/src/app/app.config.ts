import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { itemsReducer } from './store/items.reducer';
import { productsReducer } from './store/producs.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './store/effects/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({
    itemsReducer: itemsReducer,
    productsReducer: productsReducer,
  }), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideEffects(),
  provideEffects(ProductEffects)]
};
