import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatisticsService } from '../service/statistics.service';
import { DialogComponent } from '../utils/dialog/dialog.component';
import { countriesList } from '../utils/utils';
import { state, style, transition, trigger } from '@angular/animations';
import { ShakeAnimation } from '../utils/animations/animations';
import { ConfettiService } from '../utils/confetti/confetti.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('shake', [
      state('0', style({})),
      state('1', style({})),
      transition('0 => 1', ShakeAnimation),
    ]),
  ]
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

  constructor(
    public dialog: MatDialog,
    private service: StatisticsService,
    private confettiService: ConfettiService
  ) {}

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
    // To test end game quickly
    // this.guessedId.length = this.cards.length;

    this.freeze = true;
    if (this.areEquals()) {
      this.guessedId.push(this.selectedCards[0].id);
      this.guessedId.push(this.selectedCards[1].id);
      this.selectedCards[0].asserted = true;
      this.selectedCards[1].asserted = true;
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
      this.stopTimer();
      this.openDialog();
      this.confettiService.canon();
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


      dialogRef.afterClosed().subscribe((playerName) => {
        if (playerName) {
          this.service.addScore(
            playerName,
            this.timer,
            String(this.moves)
          );
        }
      this.ngOnInit();
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

  private stopTimer(): void {
    clearTimeout(this.timerTimeout);
  }

  hasFinished(): boolean {
    return this.guessedId.length === this.cards.length;
  }
}
