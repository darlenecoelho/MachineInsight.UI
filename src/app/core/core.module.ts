import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('CoreModule já foi importado. Deve ser carregado apenas uma vez.');
    }
  }
}
