import { HttpClientModule } from '@angular/common/http';
import { GetProfileService } from './services/getProfile.service';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { BattleComponent } from './battle/battle.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PopularComponent } from './popular/popular.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerFormComponent } from './player-form/player-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BattleComponent,
    NavbarComponent,
    PopularComponent,
    PlayerFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent},
      {
        path: 'battle',
        component: BattleComponent
      },
      {
        path: 'popular',
        component: PopularComponent
      }
    ])
  ],
  providers: [GetProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
