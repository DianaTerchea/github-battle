import { GetProfileService } from './../services/getProfile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from '../models/user';
@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  myForm1: FormGroup;
  myForm2: FormGroup;
  public player1: User = new User();
  public player2: User = new User();
  public show1 = false;
  public show2 = false;
  public winner: string;
  public showWinner = false;
  constructor(private fb: FormBuilder, private getProfile: GetProfileService) { }

  ngOnInit(): void {
    this.myForm1 = this.fb.group({
      username: ''
    });
    this.myForm2 = this.fb.group({
      username: ''
    });
  }


  onSubmitPlayer1(form: FormGroup) {
    this.getInfo(form.value.username, 'player1');
  }

  onSubmitPlayer2(form: FormGroup) {
    this.getInfo(form.value.username, 'player2');
  }
  public getInfo(user: string, player: string): void {
    this.getProfile.getUser(user)
    .subscribe( (data: User) => {
      if (player === 'player1'){
        this.player1 = data;
        this.show1 = true;
      } else {
        this.player2 = data;
        this.show2 = true;
       }
    },
    err => {
     return err;
    });
  }
  public battle() {
    if ( this.player1.publicRepos > this.player2.publicRepos ) {
      this.winner = this.player1.login;
      this.showWinner = true;
    } else {
      this.winner = this.player2.login;
      this.showWinner = true;
    }
    console.log(this.winner);
  }
}
