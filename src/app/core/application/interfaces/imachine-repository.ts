import { Machine } from '../../domain/entities/machine';

export interface IMachineRepository {
  listAll(): Promise<Machine[]>;
  getById(id: string): Promise<Machine>;
  create(machine: Machine): Promise<void>;
  update(machine: Machine): Promise<void>;
  delete(id: string): Promise<void>;
}
