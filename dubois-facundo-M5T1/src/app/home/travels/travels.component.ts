import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TravelsService } from '../services/travels.service';
import { Travel } from '../model/travel';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.sass'],
})
export class TravelsComponent implements OnInit {
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

  onClick = (object: any) => {
    let travelId =
      object['travelEquipmentDTOs'][object['travelEquipmentDTOs'].length - 1][
        'equipment'
      ]['id'];
    // let previousStatus: number = object['travelEquipmentDTOs'][object['travelEquipmentDTOs'].length - 1]['statusTravel']

    // if (previousStatus === 10){
    //   let value:number

    //   for (let i = 2; i <= object['travelEquipmentDTOs'].length; i++){
    //     if (object['travelEquipmentDTOs'][object['travelEquipmentDTOs'].length - i]['statusTravel'] === 10){
    //       continue
    //     }
    //       value = object['travelEquipmentDTOs'][object['travelEquipmentDTOs'].length - i]['statusTravel'] === 1
    //       || object['travelEquipmentDTOs'][object['travelEquipmentDTOs'].length - i]['statusTravel'] === 2 ? 2
    //       : 6
    //       previousStatus = value
    //       break

    //   }}

    let statusTravel = object['lastStatusTravel'] === 1 ? 2 : 6;

    let userOperation = 2;
    let cadeteId = JSON.parse(localStorage.getItem('token') || '{}');
    let isReasigned = false;
    this.tr
      .postTravel(travelId, statusTravel, userOperation, cadeteId, isReasigned)
      .subscribe(
        (resp) => {
          Swal.fire({
            title: 'Aceptado correctamente',
            icon: 'success',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#FD611A',
          });
          this.loadTravels();
        },
        (error) => {
          error.status === 403
            ? Swal.fire({
                title: 'Ya has aceptado el máximo de viajes disponibles.',
                icon: 'error',
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#FD611A',
              })
            : Swal.fire({
                title: 'Error inesperado, intenta nuevamente',
                icon: 'error',
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#FD611A',
              });
        }
      );
  };

  loadTravels() {
    let one = this.tr.getTravel(1);
    let five = this.tr.getTravel(5);

    forkJoin([one, five]).subscribe((results) => {
      this.travels = [...results[0], ...results[1]];
      this.loading = false;
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

      this.haveTravels = this.travels.length > 0 ? true : false;
    });
  }
  ngOnInit(): void {
    this.loadTravels();
  }
}
