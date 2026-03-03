import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

import { ApiService, MultiTrendPoint } from '../services/api';

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective
  ],
  templateUrl: './trends.html',
  styleUrls: ['./trends.css']
})
export class Trends implements OnInit, OnDestroy {

  loading = true;
  intervalId: any;

  selectedDisease: string = '';
  diseaseList: string[] = [];

  // ✅ ADD THIS (was missing)
  trendChartType: 'line' = 'line';

  trendChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800 },
    plugins: {
      legend: { display: true, position: 'top' }
    }
  };

  trendChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  private colors = [
    '#38bdf8',
    '#22c55e',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6'
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadTrends();
    this.intervalId = setInterval(() => this.loadTrends(), 10000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  onDiseaseChange() {
    this.loadTrends();
  }

  loadTrends() {
    this.loading = true;

    this.api.getDiseaseTrends(this.selectedDisease || undefined)
      .subscribe({
        next: (res: MultiTrendPoint[]) => {

          if (!Array.isArray(res) || res.length === 0) {
            this.resetChart();
            this.diseaseList = [];
            this.loading = false;
            return;
          }

          this.diseaseList = [...new Set(res.map(r => r.disease))];
          this.buildMultiDataset(res);
          this.loading = false;
        },
        error: () => {
          this.resetChart();
          this.loading = false;
        }
      });
  }

  buildMultiDataset(data: MultiTrendPoint[]) {

    const labels = [...new Set(data.map(d => d.date))];
    const diseases = [...new Set(data.map(d => d.disease))];

    const datasets = diseases.map((disease, index) => {
      const diseaseData = labels.map(label => {
        const match = data.find(
          d => d.date === label && d.disease === disease
        );
        return match ? match.cases : 0;
      });

      return {
        label: disease,
        data: diseaseData,
        tension: 0.4,
        fill: false,
        borderColor: this.colors[index % this.colors.length],
        pointRadius: 3
      };
    });

    this.trendChartData = {
      labels,
      datasets
    };
  }

  private resetChart() {
    this.trendChartData = {
      labels: [],
      datasets: []
    };
  }
}