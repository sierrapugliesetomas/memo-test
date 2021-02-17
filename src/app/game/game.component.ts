import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatisticsService } from '../service/statistics.service';
import { DialogComponent } from '../utils/dialog/dialog.component';
import { countriesList } from '../utils/utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  columns: number;
  difficulty = 1;
  moves: number;
  freeze: boolean;
  hideImage = '../../assets/images/hide.png';
  selectedCards: Array<any>;
  guessedId: Array<any>;
  cards: Array<any>;
  timer: number;
  timerTimeout: any;
  playerName: string;

  constructor(public dialog: MatDialog, private service: StatisticsService) {}

  ngOnInit(): void {
    this.moves = 0;
    this.selectedCards = [];
    this.guessedId = [];
    this.freeze = false;
    this.timer = 0;
    this.setCards();
    this.shuffleCards();
    this.startTime();
  }

  ngOnDestroy(): void {
    // ToDo: delete if not used
  }

  private shuffleCards(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  onClickCard(card: any): void {
    if (!this.freeze) {
      if (this.validateShowCard(card)) {
        this.selectedCards.push(card);
        card.show = true;
      }
      if (this.selectedCards.length === 2) {
        this.compareCards();
      }
    }
  }

  private areEquals(): boolean {
    return this.selectedCards[0].equalId === this.selectedCards[1].equalId;
  }

  private compareCards(): void {
    this.freeze = true;
    if (this.areEquals()) {
      this.guessedId.push(this.selectedCards[0].id);
      this.guessedId.push(this.selectedCards[1].id);
      this.selectedCards = [];
      this.freeze = false;
    } else {
      setTimeout(() => {
        this.selectedCards[0].show = false;
        this.selectedCards[1].show = false;
        this.freeze = false;
        this.selectedCards = [];
      }, 1500);
    }
    this.moves++;
    if (this.hasFinished()) {
      this.openDialog();
    }
  }
  private openDialog(): void {
    clearTimeout(this.timerTimeout);
    setTimeout(() => {
      const dialogRef = this.dialog.open(DialogComponent);
      dialogRef.afterOpened().subscribe(() => {
        dialogRef.disableClose = true;
        dialogRef.componentInstance.data = {
          moves: String(this.moves),
          timer: String(this.timer),
        };
      });

      dialogRef.backdropClick().subscribe((data) => {
        console.log(data);
      });

      dialogRef.afterClosed().subscribe((playerName) => {
        if (playerName) {
          const newScore = {
            playerName: playerName,
            time: this.timer,
            moves: this.moves,
          };

          this.service.addScore(
            playerName,
            String(this.timer),
            String(this.moves)
          );
        } else {
          this.ngOnInit();
        }
        // ToDo: Complete
      });
    }, 2000);
  }

  private validateShowCard(card): boolean {
    return (
      this.selectedCards.length < 2 &&
      this.selectedCards[0]?.id !== card.id &&
      !this.guessedId.includes(card.id)
    );
  }

  setCards(): void {
    if (this.difficulty === 1) {
      // Easy
      this.cards = JSON.parse(JSON.stringify(countriesList.slice(0, 12)));
      this.columns = 4;
    } else if (this.difficulty === 2) {
      // Medium
      this.cards = JSON.parse(JSON.stringify(countriesList.slice(0, 20)));
      this.columns = 5;
    } else {
      // Hard
      this.cards = JSON.parse(JSON.stringify(countriesList.slice(0, 30)));
      this.columns = 6;
    }
  }

  changeDifficulty(number: number): void {
    this.difficulty = number;
    this.ngOnInit();
  }

  private startTime(): void {
    clearTimeout(this.timerTimeout);
    this.timerTimeout = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  private hasFinished(): boolean {
    return this.guessedId.length === this.cards.length;
  }
}
