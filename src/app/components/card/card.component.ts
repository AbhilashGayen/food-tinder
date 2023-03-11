import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { GestureController, IonCard, Platform } from '@ionic/angular';
import { Product } from 'src/app/api/machine-api.service';
import { CardCounterService } from './card-counter.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() products: Product[];
  @ViewChildren(IonCard, { read: ElementRef }) cards: QueryList<ElementRef>;

  get isCards() {
    return this.counterSvc?.voteCounter?.swipedIds.length === this.products.length;
  }

  constructor(
    private gestureCtrl: GestureController,
    private plt: Platform,
    public counterSvc: CardCounterService
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products) {
      this.products = this.products;
    }
  }

  ngAfterViewInit(): void {
    const cardArray = this.cards.toArray();
    this.useSwipe(cardArray)
  }

  useSwipe(cardArray: ElementRef[]) {
    for (let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i];
      const gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'swipe',
        onMove: ev => {
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
        },
        onEnd: ev => {
          card.nativeElement.style.transition = '.5s ease-out';
          if (ev.deltaX > 150) {
            card.nativeElement.style.transform =
              `translateX(${this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
            this.counterSvc.like(card.nativeElement.id);
          } else if (ev.deltaX < -150) {
            card.nativeElement.style.transform =
              `translateX(-${this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
            this.counterSvc.dislike(card.nativeElement.id);
          } else {
            card.nativeElement.style.transform = '';
          }
          this.counterSvc.setVoteCounter();
        }
      })
      gesture.enable(true);
    }
  }
}
