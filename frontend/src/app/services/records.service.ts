import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecordsResponse } from '../models/record.model';

@Injectable({ providedIn: 'root' })
export class RecordsService {
  constructor(private http: HttpClient) {}

  getRecords(delayMs: number) {
    const params = new HttpParams().set('delay', delayMs);
    return this.http.get<RecordsResponse>('/api/records', { params });
  }
}
