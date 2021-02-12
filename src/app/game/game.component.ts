import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { countriesList } from '../utils/utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  columns: number;
  difficulty = 2;
  moves: number;
  freeze: boolean;
  hideImage = '../../assets/images/hide.png';
  selectedCards: Array<any>;
  guessedId: Array<any>;
  cards: Array<any>;
  timer: number;
  timerSubscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.moves = 0;
    this.selectedCards = [];
    this.guessedId = [];
    this.freeze = false;
    this.timer = 0;
    this.setCards();
    this.cards.sort(() => {
      return 0.5 - Math.random();
    });
    this.startTime();
  }

  ngOnDestroy(): void {
    // ToDo: might delete this, takeWhile unsubscribes automatically
    this.timerSubscription.unsubscribe();
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
      console.log('You won!');
    }
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
    this.timerSubscription = timer(1000, 1000)
      .pipe(takeWhile(() => !this.hasFinished()))
      .subscribe(() => this.timer++);
  }

  private hasFinished(): boolean {
    return this.guessedId.length === this.cards.length;
  }
}
