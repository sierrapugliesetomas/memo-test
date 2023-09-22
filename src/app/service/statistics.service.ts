import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Score } from '../utils/score/score.mode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class StatisticsService {

  constructor(private http: HttpClient) {}

  API_URL = environment.apiURL;

  addScore(playerName: string, time: number, moves: number, difficulty: string) {
    const scoreData: Score = {
      playerName: playerName,
      time: time,
      difficulty,
      moves: moves
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
          difficulty: difficulty,
          moves: moves
        };
    });
  }

  getScores(difficulty: string): Observable<Score[]> {
    const options =  { params: new HttpParams().set('difficulty', difficulty) };
    return this.http.get<any>(this.API_URL, options).pipe(map(data => data.scores));
  }
}
