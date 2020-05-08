import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {User, Stats} from '../models/user';
import { GetProfileService } from '../services';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
  myForm: FormGroup;
  public player: User = new User();
  public repos: string[] = [];
  public stats: Stats[] = [];
  public show = false;
  public error = false;
  public score = 0;
  constructor(private fb: FormBuilder, private request: GetProfileService) { }

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

   public getInfo(user: string): void {
    this.request.getUser(user)
    .subscribe( (data: User) => {
      this.player = data;
      this.show = true;
      this.error = false;
    },
    err => {
     console.log('[Eroare]' + err);
     this.error = true;
    });
  }

  private getRepos(user: string): void {
    this.request.getRepos(user)
    .subscribe( (data) => {
      this.repos = data;
      this.getStats();
    },
    err => {
     console.log('[Eroare din getRepos]' + err);
    });
  }

  public getStats(): void {
    let i = 0;
    for ( i = 0; i < this.repos.length; i++) {
    this.request.getStats(this.repos[i])
    .subscribe( (data) => {
      this.stats[i] = data;
      console.log(this.stats[i]);
    },
    err => {
     console.log('[Eroare din getStats]' + err);
    });
  }
  }

  computeScore() {
    let i = 0;
    for ( i = 0; i < this.stats.length; i++) {
      console.log(this.stats[i].commits[0]);
      //  const commits = this.computeSum(this.stats[i].commits);
      //  const addition = this.computeSum(this.stats[i].addition);
      //  const deletion = this.computeSum(this.stats[i].deletion);

      //  this.score = commits * 10 + addition * 5 + deletion;
       // if ( commits === 0 || addition === 0 ) {
       //   this.score -= 100;
      //  }
    }
    console.log('Scorul este: ' + this.score);
  }

  computeSum(sum: number[]): number {
     // tslint:disable-next-line: only-arrow-functions
     const total = sum.reduce( function(a, b) {return a + b; });
     return total;
  }

}

