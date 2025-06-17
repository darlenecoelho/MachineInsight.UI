import { Machine } from '../../domain/entities/machine';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IMachineRepository {
  listAll(): Promise<Machine[]>;
  getById(id: string): Promise<Machine>;
  create(machine: Machine): Promise<void>;
  update(machine: Machine): Promise<void>;
  delete(id: string): Promise<void>;
  watchStatus(): Observable<Machine>;
}
export const MACHINE_REPOSITORY = new InjectionToken<IMachineRepository>('MACHINE_REPOSITORY');