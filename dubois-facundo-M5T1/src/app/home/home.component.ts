import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Travel } from './model/travel';
import { TravelsService } from './services/travels.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
currentClient!:string

public travels!: any
public haveTravels = false

  constructor(private router: Router, private tr: TravelsService) { }
  navigate(prop:string) {
    this.router.navigate([`home/${prop}`]);
}

  ngOnInit(): void {
    let two = this.tr.getTravel(2)
    let three = this.tr.getTravel(3)
    let six = this.tr.getTravel(6)
    let seven = this.tr.getTravel(7)

    forkJoin([two, three, six, seven])
      .subscribe(
        results => {
          this.travels = [...results[0], ...results[1], ...results[2], ...results[3]]

          this.travels = this.travels.filter(function (item: Travel) {
            if (item.travelEquipmentDTOs[item.travelEquipmentDTOs.length - 1].cadete) {
              return item.travelEquipmentDTOs[item.travelEquipmentDTOs.length - 1].cadete.id === JSON.parse(localStorage.getItem('token') || '{}');
            }
            return false
          })


          this.travels.sort(function (a: Travel, b: Travel) {
            return Date.parse(a.travelEquipmentDTOs[a.travelEquipmentDTOs.length - 1].operationDate) - Date.parse(b.travelEquipmentDTOs[b.travelEquipmentDTOs.length - 1].operationDate)
          })
          console.log(this.travels)
          this.haveTravels = this.travels.length > 0 ? true : false

        })

    if(JSON.parse(localStorage.getItem('name') || '').split(' ').slice(0, -1).join(' ').length > 0){
      this.currentClient = JSON.parse(localStorage.getItem('name') || '').split(' ').slice(0, 1).join(' ')
      }
      else
      {this.currentClient = JSON.parse(localStorage.getItem('name') || '')}}
  

}
