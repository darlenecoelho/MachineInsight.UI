import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule }                        from '@angular/common';
import { HttpClientModule }                    from '@angular/common/http';
import { MatToolbarModule }                    from '@angular/material/toolbar';
import { MatButtonModule }                     from '@angular/material/button';
import { MatListModule }                       from '@angular/material/list';
import { MatIconModule }                       from '@angular/material/icon';
import * as L                                  from 'leaflet';
import { Subscription }                        from 'rxjs';
import { MachineTelemetryService }             from '../../../core/infrastructure/services/machine-telemetry.service';
import { StatusColorService }                  from '../../../core/domain/services/status-color.service';
import { RawMachineDto }                       from '../../../core/infrastructure/dtos/raw-machine.dto';
import { TelemetryEvent }                      from '../../../core/infrastructure/dtos/telemetry-event';
import { MachineStatus }                       from '../../../core/domain/enums/machine-status';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  public machines: RawMachineDto[] = [];
  private map!: L.Map;
  private markers = new Map<string, L.CircleMarker>();
  private telemetrySub!: Subscription;
  public MachineStatus = MachineStatus;

   public statusList = [
    { value: MachineStatus.Operating,   label: 'Operating'   },
    { value: MachineStatus.Maintenance, label: 'Maintenance' },
    { value: MachineStatus.Shutdown,    label: 'Shutdown'    },
    { value: MachineStatus.Idle,        label: 'Idle'        },
    { value: MachineStatus.Fault,       label: 'Fault'       },
  ];

  constructor(
    private telemetryService: MachineTelemetryService,
    private colorService: StatusColorService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadMachines();
    this.subscribeTelemetry();
    setTimeout(() => this.map.invalidateSize(), 0);
  }

  ngOnDestroy(): void {
    this.telemetrySub?.unsubscribe();
    this.map?.remove();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-22.167847, -49.934624],
      zoom: 12,
      minZoom: 5,
      maxZoom: 18
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadMachines(): void {
    this.telemetryService.listMachines()
      .subscribe(list => {
        this.machines = list;
        list.forEach(m => this.renderMarker(m));
      });
  }

  private subscribeTelemetry(): void {
    this.telemetrySub = this.telemetryService.telemetry$()
      .subscribe(evt => this.handleTelemetry(evt));
  }

  private handleTelemetry(evt: TelemetryEvent): void {
    const idx = this.machines.findIndex(m => m.id === evt.machineId);
    if (idx === -1) return;

    const updated: RawMachineDto = {
      ...this.machines[idx],
      status: evt.status,
      rpm: evt.rpm,
      createdAt: evt.timestamp
    };

    this.machines[idx] = updated;
    this.renderMarker(updated);
  }

  private renderMarker(m: RawMachineDto): void {
    const coords: L.LatLngExpression = [m.latitude, m.longitude];
    const color = this.colorService.getColor(m.status);
    const popup  = `<b>${m.name}</b><br>Status: ${m.status}<br>RPM: ${m.rpm}`;

    if (this.markers.has(m.id)) {
      const marker = this.markers.get(m.id)!;
      marker.setLatLng(coords);
      marker.setStyle({ fillColor: color });
      marker.setPopupContent(popup);
    } else {
      const marker = L.circleMarker(coords, {
        radius: 8,
        fillColor: color,
        color: '#333',
        weight: 1,
        fillOpacity: 0.8
      })
      .addTo(this.map)
      .bindPopup(popup);

      this.markers.set(m.id, marker);
    }
  }

  public statusColor(status: MachineStatus): string {
    return this.colorService.getColor(status);
  }
}