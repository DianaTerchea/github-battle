import { MaterialModule } from './../material/material.module';
import { GetProfileService } from './../services/getProfile.service';
import { Repo, Language } from './../models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit, OnDestroy {
   public repos: Repo[] = [];
   public selectedType: Language = 'Typescript';
   public isLoading = true;
   private subscription: Subscription;
  constructor(private getPopular: GetProfileService) { }

  ngOnInit(): void {
    this.getRepos(this.selectedType);
    this.subscription = this.getPopular.isLoading$.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public getRepos(language: Language): void {
    this.selectedType = language;
    this.getPopular.getPopularRepos(this.selectedType)
    .subscribe((data: Repo[]) => {
     this.repos = data;
    });
  }
}
