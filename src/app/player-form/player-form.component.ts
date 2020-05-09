import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import {User, Stats, Player} from '../models/user';
import { GetProfileService } from '../services';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
  myForm: FormGroup;
  @Output() data: EventEmitter<User> = new EventEmitter();
  @Output() statistics: EventEmitter<Stats> = new EventEmitter();
  public player: User = new User();
  public repos: string[] = [];
  public show = false;
  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder, private request: GetProfileService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ''
    });
  }

  onSubmitPlayer(form: FormGroup) {
    console.log('submited form');
    this.getRepos(form.value.username);
    this.getInfo(form.value.username);
   }

   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

   public getInfo(user: string): void {
    this.request.getUser(user)
    .subscribe( (data: User) => {
      this.player = data;
      this.show = true;
      this.sendData(this.player);
    },
    err => {
     console.log('[Eroare]' + err);
     this.openSnackBar('There is no account registered with this username', '');
    });
  }

  private getRepos(user: string): void {
    this.request.getRepos(user)
    .subscribe( (data) => {
      this.repos = data;
      this.getStats(user);
    },
    err => {
     console.log('[Eroare din getRepos]' + err);
    });
  }

  public getStats(username: string): void {
    let i = 0;
    for ( i = 0; i < this.repos.length; i++) {
    this.request.getStats(this.repos[i], username)
    .subscribe( (data) => {
      this.sendStats(data);
    },
    err => {
     console.log('[Eroare din getStats]' + err);
    });
  }
  }
  sendData(user: User) {
    this.data.emit(user);
  }
  sendStats(stats: Stats) {
    this.statistics.emit(stats);
  }
}
