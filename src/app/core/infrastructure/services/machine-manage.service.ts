import { Injectable }      from '@angular/core';
import { HttpClient }      from '@angular/common/http';
import { Observable }      from 'rxjs';
import { environment }     from '../../../../environments/environment';
import { RawMachineDto }   from '../dtos/raw-machine.dto';
import { CreateMachineDto, UpdateMachineDto } from '../dtos';

@Injectable({ providedIn: 'root' })
export class MachineCrudService {
  private base = `${environment.apiUrl}/machines`;

  constructor(private http: HttpClient) {}

  list(): Observable<RawMachineDto[]> {
    return this.http.get<RawMachineDto[]>(this.base);
  }

  getById(id: string): Observable<RawMachineDto> {
    return this.http.get<RawMachineDto>(`${this.base}/${id}`);
  }

  create(dto: CreateMachineDto): Observable<RawMachineDto> {
    return this.http.post<RawMachineDto>(this.base, dto);
  }

  update(id: string, dto: UpdateMachineDto): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  listByStatus(status: number): Observable<RawMachineDto[]> {
    return this.http.get<RawMachineDto[]>(`${this.base}/status/${status}`);
  }
}