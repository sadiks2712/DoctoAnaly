import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/* =================================
   📈 MULTI-DISEASE TREND MODEL
================================= */
export interface MultiTrendPoint {
  date: string;
  disease: string;
  cases: number;
}

/* =================================
   📊 SUMMARY MODEL
================================= */
export interface SummaryResponse {
  total_records: number;
  avg_age: number;
  high_risk?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // ✅ Always use exact backend URL
  private baseUrl = 'https://doctoanalyai.onrender.com';

  constructor(private http: HttpClient) {}

  /* =================================
     📊 SUMMARY
  ================================= */
  getSummary(
    age?: number,
    gender?: number,
    region?: string,   // ✅ FIXED (was string)
    disease?: string
  ): Observable<SummaryResponse> {

    let params = new HttpParams();

    if (age !== undefined) params = params.set('age', age.toString());
    if (gender !== undefined) params = params.set('gender', gender.toString());
    if (region !== undefined) params = params.set('region', region.toString());
    if (disease) params = params.set('disease', disease);

    return this.http.get<SummaryResponse>(
      `${this.baseUrl}/summary`,
      { params }
    );
  }

  /* =================================
     🔮 FORECAST
  ================================= */
  getForecast(): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast`);
  }

  /* =================================
     🧠 RISK PREDICTION
  ================================= */
  predictRisk(data: any): Observable<any> {
    const formData = new FormData();

    // ✅ Ensure values are strings
    formData.append('age', data.age.toString());
    formData.append('gender', data.gender.toString());
    formData.append('region', data.region.toString());

    return this.http.post(`${this.baseUrl}/predict`, formData);
  }

  /* =================================
     📤 UPLOAD DATASET
  ================================= */
  uploadDataset(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload-data`, formData);
  }

  /* =================================
     📈 MULTI-DISEASE TRENDS
  ================================= */
  getDiseaseTrends(disease?: string): Observable<MultiTrendPoint[]> {

    let params = new HttpParams();

    if (disease) {
      params = params.set('disease', disease);
    }

    return this.http.get<MultiTrendPoint[]>(
      `${this.baseUrl}/trends`,
      { params }
    );
  }
}