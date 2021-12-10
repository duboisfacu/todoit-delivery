import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TravelsService } from '../services/travels.service';
import { Travel } from '../model/travel';
@Component({
  selector: 'app-travels',
  templateUrl: './myTravel.component.html',
  styleUrls: ['./myTravel.component.sass']
})
export class MytravelComponent implements OnInit {

  public travels!: any
  public travels2!: any
  public myTravels!: any
  public utc = new Date().toISOString().slice(0, 10)
  public year = parseInt(this.utc.slice(0, 4))
  public month = parseInt(this.utc.slice(5, 7))
  public day = parseInt(this.utc.slice(8, 10))

  constructor(private tr: TravelsService) {}

  onClick = (object: any, typeButton: string) => {
    let travelId = object['travelEquipmentDTOs'][object['travelEquipmentDTOs'].length - 1]['equipment']['id']
    let statusTravel = object['travelEquipmentDTOs'][object['travelEquipmentDTOs'].length - 1]
    let isReasigned = false
    let userOperation = 2
    let cadeteId = JSON.parse(localStorage.getItem('token') || '{}')
    console.log(travelId, statusTravel, userOperation, cadeteId, isReasigned)

    if (typeButton === "rejectOne") {
      this.tr.postTravel(travelId, 1, userOperation, cadeteId, true).subscribe(resp => {
        console.log(resp)
        this.loadTravels()
      })
    } else if (typeButton === "retired") {
      this.tr.postTravel(travelId, 3, userOperation, cadeteId, isReasigned).subscribe(resp => {
        console.log(resp)
        this.loadTravels()
      })
    } else if (typeButton === "deliveredIt") {
      this.tr.postTravel(travelId, 4, userOperation, cadeteId, isReasigned).subscribe(resp => {
        console.log(resp)
        this.loadTravels()
      })
    } else if (typeButton === "obtained") {
      this.tr.postTravel(travelId, 7, userOperation, cadeteId, isReasigned).subscribe(resp => {
        console.log(resp)
        this.loadTravels()
      })
    } else if (typeButton === "delivered") {
      this.tr.postTravel(travelId, 8, userOperation, cadeteId, isReasigned).subscribe(resp => {
        console.log(resp)
        this.loadTravels()
      })
    } else if (typeButton === "rejectFive") {
      this.tr.postTravel(travelId, 5, userOperation, cadeteId, true).subscribe(resp => {
        console.log(resp)
        this.loadTravels()
      })}
  }


  loadTravels() {
    let two = this.tr.getTravel(2)
    let three = this.tr.getTravel(3)
    let six = this.tr.getTravel(6)
    let seven = this.tr.getTravel(7)
    // let eight = this.tr.getTravel(8)

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

        });
  }
  ngOnInit(): void {
    this.loadTravels()
  }

}

// 

// this.myTravels = results['cadete']['id'] === JSON.parse(localStorage.getItem('token') || '{}')

// 1 5 10
// 2 6

// 2 : cancelado, retirado
// 3 : ya está en laboratori

// 6 : cancelado, entregado