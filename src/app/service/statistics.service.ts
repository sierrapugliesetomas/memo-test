import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Score } from '../utils/score/score.mode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root',
})
export class StatisticsService {

  constructor(private http: HttpClient) {}

  API_URL = 'http://localhost:3000/api/scores';

  addScore(playerName: string, time: number, moves: string) {
    const scoreData: Score = {
      playerName: playerName,
      time: time,
      // moves: moves,
    };
    this.http
      .post<{ message: string; score: Score }>(
        this.API_URL,
        scoreData
      )
      .subscribe((responseData) => {
        const score: Score = {
          id: responseData.score.id,
          playerName: playerName,
          time: time,
          // moves: moves,
        };
        // Update shown scores
      });
  }

  getScores(): Observable<Score[]> {
    return this.http.get<any>(this.API_URL).pipe(map(data => data.scores));
  }
}
