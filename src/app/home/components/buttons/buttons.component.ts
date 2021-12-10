import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.sass']
})
export class ButtonsComponent implements OnInit {
  
  public travelButton!:boolean
  public myTravelButton!:boolean

  constructor(private router: Router) { }
  navigate(prop:string) {
    if (prop === 'travels'){
      this.travelButton = true
      this.myTravelButton = false
    }else if (prop === 'mytravels'){
      this.travelButton = false
      this.myTravelButton = true
    }
    this.router.navigate([`home/${prop}`]);
}
  ngOnInit(): void {
    if (this.router.url === '/home/travels'){
      this.travelButton = true
      this.myTravelButton = false
    }else if (this.router.url === '/home/mytravels'){
      this.travelButton = false
      this.myTravelButton = true
    }
  }

}
