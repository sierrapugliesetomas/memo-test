import { Component, OnInit } from '@angular/core';
import { Score } from '../utils/score/score.mode';
import { StatisticsService } from '../service/statistics.service';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})

export class ScoresComponent implements OnInit {
  displayedColumns: string[] = ['position', 'player', 'time'];
  dataSource: Score[];

  constructor(private statisticsService: StatisticsService ) { }

  ngOnInit(): void {
    this.getScores();
  }

  getScores(): void {
    this.statisticsService.getScores().pipe(take(1)).subscribe(data => {
      this.dataSource = data;
    })
  }
}
