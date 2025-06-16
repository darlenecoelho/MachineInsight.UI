import { Location } from '../value-object/location';
import { MachineStatus } from '../enums/machine-status';

export class Machine {
  constructor(
    public id: string,
    public name: string,
    public location: Location,
    public status: MachineStatus
  ) {}
}
