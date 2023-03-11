import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardCounterService implements OnInit {
  readonly VoteCounterKey = 'voteCounter';

  readonly defaultVouteCounter = {
    likedIds: [],
    dislikedIds: [],
    swipedIds: []
  }
  voteCounter = { ...this.defaultVouteCounter };

  constructor() { }

  ngOnInit(): void {

  }

  getVoteCounter() {
    return this.voteCounter;
  }

  initVoteCounter() {
    const storedCounter = JSON.parse(localStorage.getItem(this.VoteCounterKey));
    this.voteCounter = {
      likedIds: storedCounter?.likedIds || [],
      dislikedIds: storedCounter?.dislikedIds || [],
      swipedIds: storedCounter?.swipedIds || []
    }
    localStorage.removeItem(this.VoteCounterKey);
    return this.voteCounter;
  }

  like(id: string) {
    this.voteCounter.likedIds.push(id);
    this.voteCounter.swipedIds.push(id);
  }

  dislike(id: string) {
    this.voteCounter.dislikedIds.push(id);
    this.voteCounter.swipedIds.push(id);
  }

  setVoteCounter() {
    localStorage.setItem(this.VoteCounterKey, JSON.stringify(this.voteCounter));
  }

  removeVoteCounter() {
    localStorage.removeItem(this.VoteCounterKey);
    this.voteCounter = { ...this.defaultVouteCounter };
  }


}
