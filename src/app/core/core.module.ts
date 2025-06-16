import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MachineRepositoryService } from './infrastructure/machine-repository.service';

@NgModule({
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('CoreModule já foi importado. Deve ser carregado apenas uma vez.');
    }
  }
}
