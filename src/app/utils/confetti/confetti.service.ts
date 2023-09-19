import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

/*
    Shows confetti animations, just for fun.
    See: https://www.kirilv.com/canvas-confetti/
*/
@Injectable({
    providedIn: 'root'
})
export class ConfettiService {

  public canon(): void {
    confetti({
      angle: this.randomInRange(280, 360),
      spread: this.randomInRange(350, 360),
      particleCount: this.randomInRange(600, 800),
      origin: { y: 0.6 }
    });
  }

  private randomInRange(min, max) {
      return Math.random() * (max - min) + min;
  }
}