import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule }                        from '@angular/common';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule     } from '@angular/material/input';


@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,  
    MatInputModule   
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
  public searchResults: RawMachineDto[] = [];
  public highlightedId: string | null = null;


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
    const statusName = MachineStatus[m.status];
    const popup  = `<b>${m.name}</b><br>Status: ${statusName}<br>RPM: ${m.rpm}`;

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

  public onSearch(term: string): void {
  const lower = term.trim().toLowerCase();
  if (!lower) {
    this.searchResults = [];
    this.highlightedId = null;
    return;
  }

  this.searchResults = this.machines
    .filter(m => m.name.toLowerCase().includes(lower));
}

public selectMachine(id: string): void {
  this.highlightedId = id;

  const machine = this.machines.find(m => m.id === id);
  if (!machine) return;

  this.map.setView([machine.latitude, machine.longitude], this.map.getZoom());

  this.markers.forEach((marker, key) => {
    const m = this.machines.find(x => x.id === key)!;
    const baseColor = this.colorService.getColor(m.status);
    marker.setStyle({
      radius: 8,
      fillColor: baseColor,
      color: key === id ? 'limegreen' : '#333',
      weight: key === id ? 3 : 1,
      fillOpacity: 0.8
    });
  });

  this.markers.get(id)?.openPopup();
  this.searchResults = []; 
}
}