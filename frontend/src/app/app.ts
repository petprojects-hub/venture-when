import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface DummyData {
  title: string;
  description: string;
  features: Array<{
    id: number;
    name: string;
    description: string;
  }>;
  currentWeather: {
    location: string;
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  };
  timestamp: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Venture When - Tourism & Weather App');

  private http = inject(HttpClient);

  dummyData = signal<DummyData | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.fetchDummyData();
  }

  fetchDummyData() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<DummyData>('http://localhost:3000/api/dummy-data')
      .subscribe({
        next: (data) => {
          this.dummyData.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load data from backend. Make sure the backend server is running on port 3000.');
          this.loading.set(false);
          console.error('Error fetching dummy data:', err);
        }
      });
  }
}
