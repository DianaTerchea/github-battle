import { GetProfileService } from './../services/getProfile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { User, Stats } from '../models/user';
@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  public player1: User = new User();
  public player2: User = new User();
  public stats1: Stats[] = [];
  public stats2: Stats[] = [];
  public score: number[] = [0, 0];
  public show1 = false;
  public show2 = false;
  public showWinner = false;
  public podium: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  getPlayer1Data(data) {
    this.player1 = data;
    this.show1 = true;
  }

  getPlayer2Data(data) {
    this.player2 = data;
    this.show2 = true;
  }

  getStatsPlayer1(statistics) {
    this.stats1.push(statistics);
    this.computePlayer1Score();
  }

  getStatsPlayer2(statistics) {
    this.stats2.push(statistics);
    this.computePlayer2Score();
  }

  computePlayer1Score() {
    this.score[0] += this.player1.publicRepos + this.stats1[0].commits * 10 +  this.stats1[0].addition * 20;
  }
  computePlayer2Score() {
    this.score[1] += this.player2.publicRepos + this.stats2[0].commits * 10 +  this.stats2[0].addition * 20;
  }

  battle() {
    console.log('Score: ' + this.score);
    if (this.score[0] > this.score[1]) {
      console.log('Winner' + this.player1.login);
      this.showWinner = true;
      this.podium[0] = this.player1.login;
      this.podium[1] = this.player2.login;
      this.show1 = false;
      this.show2 = false;
    } else {
      console.log('Winner' + this.player2.login);
      this.showWinner = true;
      this.podium[0] = this.player2.login;
      this.podium[1] = this.player1.login;
      this.show1 = false;
      this.show2 = false;
    }
  }

  refresh(): void {
    window.location.reload();
}
}
