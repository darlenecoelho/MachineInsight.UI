import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RawMachineDto } from '../dtos/raw-machine.dto';
import { TelemetryEvent } from '../dtos/telemetry-event';

@Injectable({ providedIn: 'root' })
export class MachineTelemetryService {
  private readonly hubUrl = environment.hubUrl;
  private readonly apiUrl = `${environment.apiUrl}/machines`;

  private hub!: HubConnection;
  private telemetrySubject = new ReplaySubject<TelemetryEvent>(1);

  constructor(private http: HttpClient) {}

  listMachines(): Observable<RawMachineDto[]> {
    return this.http.get<RawMachineDto[]>(this.apiUrl);
  }

  telemetry$(): Observable<TelemetryEvent> {
    if (!this.hub) {
      this.initSignalR();
    }
    return this.telemetrySubject.asObservable();
  }

  private initSignalR(): void {
    this.hub = new HubConnectionBuilder()
      .withUrl(this.hubUrl, { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    this.hub.on('ReceiveTelemetry', (evt: TelemetryEvent) => {
      this.telemetrySubject.next(evt);
    });

    this.hub.start().catch(err => console.error('SignalR error:', err));
  }
}