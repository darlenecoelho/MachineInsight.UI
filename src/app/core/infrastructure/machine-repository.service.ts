import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMachineRepository } from '../application/interfaces/imachine-repository';
import { Machine } from '../domain/entities/machine';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, firstValueFrom  } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { RawMachineDto } from './dtos/raw-machine.dto';

@Injectable({ providedIn: 'root' })
export class MachineRepositoryService implements IMachineRepository {
  private readonly apiUrl = `${environment.apiUrl}/machines`;
private socket$: WebSocketSubject<RawMachineDto>;

  constructor(private http: HttpClient) {
  this.socket$ = webSocket<RawMachineDto>(environment.hubUrl || '');
  }

  listAll(): Promise<Machine[]> {
    return firstValueFrom(this.http.get<any[]>(this.apiUrl))
      .then(arr => arr.map(j => new Machine(
        j.id,
        j.name,
        { latitude: j.latitude, longitude: j.longitude },
        j.status   // se quiser converter para enum, faça aqui
      )));
  }

  getById(id: string): Promise<Machine> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/${id}`))
      .then(j => new Machine(
        j.id,
        j.name,
        { latitude: j.latitude, longitude: j.longitude },
        j.status
      ));
  }

  create(machine: Machine): Promise<void> {
    const payload = {
      name: machine.name,
      latitude: machine.location.latitude,
      longitude: machine.location.longitude,
      status: machine.status
    };
    return firstValueFrom(this.http.post<void>(this.apiUrl, payload));
  }

  update(machine: Machine): Promise<void> {
    const payload = {
      name: machine.name,
      latitude: machine.location.latitude,
      longitude: machine.location.longitude,
      status: machine.status
    };
    return firstValueFrom(this.http.put<void>(`${this.apiUrl}/${machine.id}`, payload));
  }

  delete(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  watchStatus(): Observable<Machine> {
    return this.socket$.pipe(
      map((j: any) => new Machine(
        j.id,
        j.name,
        { latitude: j.latitude, longitude: j.longitude },
        j.status
      ))
    );
  }
}