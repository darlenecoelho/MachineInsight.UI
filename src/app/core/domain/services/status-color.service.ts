import { Injectable } from '@angular/core';
import { MachineStatus } from '../enums/machine-status';

@Injectable({ providedIn: 'root' })
export class StatusColorService {
  private readonly colorMap: Record<MachineStatus, string> = {
    [MachineStatus.Unknown]:     '#000000',
    [MachineStatus.Operating]:   '#4caf50',  
    [MachineStatus.Maintenance]: '#ff9800',  
    [MachineStatus.Shutdown]:    '#9e9e9e',  
    [MachineStatus.Idle]:        '#2196f3',  
    [MachineStatus.Fault]:       '#f44336' 
  };

  getColor(status: MachineStatus): string {
    return this.colorMap[status] || this.colorMap[MachineStatus.Unknown];
  }
}