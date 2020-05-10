import { GetProfileService } from './../services/getProfile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { User, Stats } from '../models/user';
@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  public player1: User = new User();
  public player2: User = new User();
  public score: number[] = [0, 0];
  public podium: string[] = [];
  public show1 = false;
  public show2 = false;
  public showWinner = false;
  public equality = false;
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
    this.computeScore(statistics, 'player1');
  }

  getStatsPlayer2(statistics) {
    this.computeScore(statistics, 'player2');
  }


  computeScore(stats: Stats, player: string) {
    if ( player === 'player1') {
      this.score[0] += this.player1.publicRepos + stats.commits * 10 + stats.addition * 20 + stats.deletion * 5;
      if (stats.commits === 0) {
         this.score[0] -= 1000;
      }
    } else {
      this.score[1] += this.player2.publicRepos + stats.commits * 10 + stats.addition * 20 + stats.deletion * 5;
      if (stats.commits === 0) {
         this.score[1] -= 1000;
      }
    }
  }

  battle() {
    console.log('Score: ' + this.score);
    if (this.score[0]  > this.score[1]) {
      console.log('Winner' + this.player1.login);
      this.showWinner = true;
      this.podium[0] = this.player1.login;
      this.podium[1] = this.player2.login;
      this.show1 = false;
      this.show2 = false;
    } else if (this.score[0]  < this.score[1]) {
      this.showWinner = true;
      this.podium[0] = this.player2.login;
      this.podium[1] = this.player1.login;
      this.show1 = false;
      this.show2 = false;
    } else {
      this.equality = true;
      this.show1 = false;
      this.show2 = false;
    }
  }

  refresh(): void {
    window.location.reload();
}
}
