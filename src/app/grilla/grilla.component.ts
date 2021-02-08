import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css'],
})
export class GrillaComponent implements OnInit {
  
  score = 0;
  mistakes = 0;
  freeze = false;
  hideImage = '../../assets/images/hide.png';
  selectedCards = [];
  guessedId = []
  cards = [
    { text: 'One', showImage: '../../assets/images/brasil.svg', equalId: 1, id: 1 , show: false },
    { text: 'Two', showImage: '../../assets/images/brasil.svg', equalId: 1, id: 2 , show: false },
    { text: 'Three', showImage: '../../assets/images/argentina.svg', equalId: 2, id: 3, show: false },
    { text: 'Four', showImage: '../../assets/images/argentina.svg', equalId: 2, id: 4 , show: false },
    { text: 'Five', showImage: '../../assets/images/china.svg', equalId: 3, id: 5 , show: false },
    { text: 'Six', showImage: '../../assets/images/china.svg', equalId: 3, id: 6 , show: false },
    { text: 'Seven', showImage: '../../assets/images/usa.svg', equalId: 4, id: 7 , show: false },
    { text: 'Eight', showImage: '../../assets/images/usa.svg', equalId: 4, id: 8 , show: false },
    { text: 'Nine', showImage: '../../assets/images/germany.svg', equalId: 5, id: 9 , show: false },
    { text: 'Ten', showImage: '../../assets/images/germany.svg', equalId: 5, id: 10 , show: false },
    { text: 'Eleven', showImage: '../../assets/images/japan.svg', equalId: 6, id: 11 , show: false },
    { text: 'Twelve', showImage: '../../assets/images/japan.svg', equalId: 6, id: 12 , show: false },
    { text: 'Thirteen', showImage: '../../assets/images/macedonia.svg', equalId: 7, id: 13 , show: false },
    { text: 'Fourteen', showImage: '../../assets/images/macedonia.svg', equalId: 7, id: 14 , show: false },
    { text: 'Fifteen', showImage: '../../assets/images/mexico.svg', equalId: 8, id: 15 , show: false },
    { text: 'Sixteen', showImage: '../../assets/images/mexico.svg', equalId: 8, id: 16 , show: false },
    { text: 'Seventeen', showImage: '../../assets/images/portugal.svg', equalId: 9, id: 17 , show: false },
    { text: 'Eighteen', showImage: '../../assets/images/portugal.svg', equalId: 9, id: 18 , show: false },
    { text: 'Nineteen', showImage: '../../assets/images/spain.svg', equalId: 10, id: 19 , show: false },
    { text: 'Twenty', showImage: '../../assets/images/spain.svg', equalId: 10, id: 20 , show: false },
    { text: 'Twenty-one', showImage: '../../assets/images/venezuela.svg', equalId: 11, id: 21 , show: false },
    { text: 'Twenty-two', showImage: '../../assets/images/venezuela.svg', equalId: 11, id: 22 , show: false },
    { text: 'Twenty-three', showImage: '../../assets/images/wales.svg', equalId: 12, id: 23 , show: false },
    { text: 'Twenty-four', showImage: '../../assets/images/wales.svg', equalId: 12, id: 24 , show: false },
  ];

  constructor() {}

  ngOnInit(): void {
    // ToDo: shuffle array
    this.cards.sort(() => { return 0.5 - Math.random()});
  }

  onClickCard(card: any) {
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

  private areEquals() {
    return this.selectedCards[0].equalId === this.selectedCards[1].equalId;
  }

  private compareCards() {
    this.freeze = true;
    if (this.areEquals()) {
      this.guessedId.push(this.selectedCards[0].id);
      this.guessedId.push(this.selectedCards[1].id);
      this.selectedCards = [];
      this.freeze = false;
      this.score += 120;
      // dont transform on hover
    } else {
      setTimeout(() => {
        this.selectedCards[0].show = false;
        this.selectedCards[1].show = false;
        this.freeze = false;
        this.selectedCards = [];
        this.mistakes++;
      }, 1500);
    }
  }
  private validateShowCard(card) {
    return (this.selectedCards.length < 2 && this.selectedCards[0]?.id !== card.id && !this.guessedId.includes(card.id));
  }
  
}
