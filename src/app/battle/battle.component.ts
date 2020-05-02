import { GetProfileService } from './../services/getProfile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
class User {
  username: string;
  avatarUrl: string;
  accountUrl: string;
  repos: number;
  followers: number;

  User(name: string, avatar: string, account: string, repo: number, follow: number ){
    this.username = name;
    this.avatarUrl = avatar;
    this.accountUrl = account;
    this.repos = repo;
    this.followers = follow;
  }
}
@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  myForm1: FormGroup;
  myForm2: FormGroup;
  public responsePlayer1: any;
  public responsePlayer2: any;
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
    console.log('Username', form.value.username);
    this.getInfo(form.value.username, 'player1');
  }

  onSubmitPlayer2(form: FormGroup) {
    console.log('Username', form.value.username);
    this.getInfo(form.value.username, 'player2');
  }
  public getInfo(user: string, player: string): void {
    this.getProfile.getUser(user)
    .subscribe( data => {
      if ( player === 'player1'){
      this.responsePlayer1 = JSON.parse(JSON.stringify(data));
      console.log(this.responsePlayer1);
      } else {
        this.responsePlayer2 = JSON.parse(JSON.stringify(data));
        console.log(this.responsePlayer2);
      }
    },
    err => {
     return err;
    });
  }
}
