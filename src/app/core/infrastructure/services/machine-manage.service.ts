import { Injectable }      from '@angular/core';
import { HttpClient }      from '@angular/common/http';
import { Observable }      from 'rxjs';
import { environment }     from '../../../../environments/environment';
import { MachineDto }   from '../dtos/machine.dto';
import { CreateMachineDto, UpdateMachineDto } from '../dtos';

@Injectable({ providedIn: 'root' })
export class MachineCrudService {
  private base = `${environment.apiUrl}/machines`;

  constructor(private http: HttpClient) {}

  list(): Observable<MachineDto[]> {
    return this.http.get<MachineDto[]>(this.base);
  }

  getById(id: string): Observable<MachineDto> {
    return this.http.get<MachineDto>(`${this.base}/${id}`);
  }

  create(dto: CreateMachineDto): Observable<MachineDto> {
    return this.http.post<MachineDto>(this.base, dto);
  }

  update(id: string, dto: UpdateMachineDto): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  listByStatus(status: number): Observable<MachineDto[]> {
    return this.http.get<MachineDto[]>(`${this.base}/status/${status}`);
  }
}