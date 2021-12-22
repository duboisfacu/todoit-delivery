import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TravelsService } from '../services/travels.service';
import { Travel } from '../model/travel';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass'],
})
export class HistoryComponent implements OnInit {
  public loading = true;
  public haveTravels = true;
  public travels!: any;
  public travels2!: any;
  public myTravels!: any;
  public utc = new Date().toISOString().slice(0, 10);
  public year = parseInt(this.utc.slice(0, 4));
  public month = parseInt(this.utc.slice(5, 7));
  public day = parseInt(this.utc.slice(8, 10));

  constructor(private tr: TravelsService) {}

  loadTravels() {
    let four = this.tr.getTravel(4);
    let eight = this.tr.getTravel(8);
    let nine = this.tr.getTravel(9);

    forkJoin([four, eight, nine]).subscribe((results) => {
      this.travels = [...results[0], ...results[1], ...results[2]];
      this.loading = false;

      this.travels = this.travels.filter(function (item: Travel) {
        if (
          item.travelEquipmentDTOs[item.travelEquipmentDTOs.length - 1].cadete
        ) {
          return (
            item.travelEquipmentDTOs[item.travelEquipmentDTOs.length - 1].cadete
              .id === JSON.parse(localStorage.getItem('token') || '{}')
          );
        }
        return false;
      });

      this.travels.sort(function (a: Travel, b: Travel) {
        return (
          Date.parse(
            a.travelEquipmentDTOs[a.travelEquipmentDTOs.length - 1]
              .operationDate
          ) -
          Date.parse(
            b.travelEquipmentDTOs[b.travelEquipmentDTOs.length - 1]
              .operationDate
          )
        );
      });
    });
  }
  ngOnInit(): void {
    this.loadTravels();
  }
}
