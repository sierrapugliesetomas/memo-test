import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private httpClient: HttpClient) {}

  postScore(): Observable<any> {
    return this.httpClient.post('localhost:3000/postScore', {
      playerName: 'name',
      time: '30',
      moves: '10',
    });
  }

  getScores(): Observable<any> {
    return this.httpClient.get('localhost:3000/getScores', {});
  }
}
