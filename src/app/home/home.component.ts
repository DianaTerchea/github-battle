import { GetProfileService } from '../services/getProfile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public response: any ;
  constructor(private getProfile: GetProfileService) { }

  ngOnInit(): void {
    this.getInfo();
  }

public getInfo(): void{
  console.log('Heloo de aici');
  this.getProfile.getInfo();
  console.log('Heloo de aici dupa executia functiei');

  this.getProfile.getInfo()
      .subscribe((response: any) => {
        this.response = response;
        console.log(response);
      });
  console.log('Heloo de aici din nou dupa executie subscribe');
}
}
