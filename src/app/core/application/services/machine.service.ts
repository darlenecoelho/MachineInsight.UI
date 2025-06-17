import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { IMachineRepository, MACHINE_REPOSITORY } from '../interfaces/imachine-repository';
import { Machine } from '../../domain/entities/machine';

@Injectable({ providedIn: 'root' })
export class MachineService {
  constructor(@Inject(MACHINE_REPOSITORY) private repo: IMachineRepository) {}

  list(): Observable<Machine[]> {
    return from(this.repo.listAll());
  }

  get(id: string): Observable<Machine> {
    return from(this.repo.getById(id));
  }

  create(machine: Machine): Observable<void> {
    return from(this.repo.create(machine));
  }

  update(machine: Machine): Observable<void> {
    return from(this.repo.update(machine));
  }

  delete(id: string): Observable<void> {
    return from(this.repo.delete(id));
  }

  watchStatus(): Observable<Machine> {
    return this.repo.watchStatus();
  }
}