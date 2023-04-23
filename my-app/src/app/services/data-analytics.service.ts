import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Data {
  data: [number, string, string, string][]
}
@Injectable({
  providedIn: 'root',
})
export class DataAnalyticsService {
  private apiUrl = 'http://127.0.0.1:5000/api/data';
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get<Data[]>(this.apiUrl);
  }
}
