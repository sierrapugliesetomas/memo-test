import { Component, OnInit } from '@angular/core';
import { Score } from '../utils/score/score.mode';
import { StatisticsService } from '../service/statistics.service';
import { finalize, take } from 'rxjs/operators'

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css'],
})

export class ScoresComponent implements OnInit {
  displayedColumns: string[] = ['position', 'player', 'time', 'difficulty'];
  dataSource: Score[];
  loading: boolean;
  difficulty: string = 'easy';
  difficultyOptions: string[] = ['easy', 'medium', 'hard'];

  constructor(private statisticsService: StatisticsService ) { }

  ngOnInit(): void {
    this.getScores();
  }

  getScores(): void {
    this.loading = true;
    this.statisticsService.getScores(this.difficulty).pipe(
      take(1),
      finalize(() => this.loading = false))
    .subscribe(data => {
      this.dataSource = data;
    });
  }

  changeDifficulty(difficulty) {
    this.difficulty = difficulty;
    this.getScores();
  }
}
