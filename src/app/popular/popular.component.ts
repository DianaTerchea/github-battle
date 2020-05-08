import { GetProfileService } from './../services/getProfile.service';
import { MatRadioModule } from '@angular/material/radio';
import { Repo, Language } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {
   public repos: Repo[] = [];
   public selectedType: Language = 'Typescript';
   public isLoading = true;
   private subscription: Subscription;
  constructor(private getPopular: GetProfileService) { }

  ngOnInit(): void {
    this.getRepos();

    this.subscription = this.getPopular.isLoading$.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }
  public getRepos(language: Language = 'Typescript'): void {
    this.selectedType = language;
    this.getPopular.getPopularRepos(language)
    .subscribe((data: Repo[]) => {
     this.repos = data;
    });
  }
}
