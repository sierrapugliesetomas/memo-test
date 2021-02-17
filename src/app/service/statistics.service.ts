import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from '../utils/score/score.mode';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  // postScore(): Observable<any> {
  //   return this.httpClient.post('localhost:3000/post', {
  //     playerName: 'name',
  //     time: '30',
  //     moves: '10',
  //   });
  // }

  // ToDo: Score interface
  addScore(playerName: string, time: string, moves: string) {
    const scoreData = {
      playerName: playerName,
      time: time,
      moves: moves,
    };
    this.http
      .post<{ message: string; score: Score }>(
        'http://localhost:3000/api/scores',
        scoreData
      )
      .subscribe((responseData) => {
        const score: Score = {
          id: responseData.score.id,
          playerName: playerName,
          time: time,
          moves: moves,
        };
        // Update shown scores
      });
  }

  // getScores(): Observable<any> {
  //   return this.httpClient.get('localhost:3000/get', {});
  // }
}
