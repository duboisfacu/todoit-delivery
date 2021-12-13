import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TravelsService } from '../services/travels.service';
import { Travel } from '../model/travel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-travels',
  templateUrl: './myTravel.component.html',
  styleUrls: ['./myTravel.component.sass']
})
export class MytravelComponent implements OnInit {

  public haveTravels = true
  public loading = true
  public travels!: any
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
        Swal.fire({
          title: 'Rechazado correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#FD611A'
        })
        this.loadTravels()
      }, error =>{
        Swal.fire({
          title: 'Error inesperado, intenta nuevamente',
          icon: 'error',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#FD611A'
        })
      })} 
      else if (typeButton === "retired") {
      this.tr.postTravel(travelId, 3, userOperation, cadeteId, isReasigned).subscribe(resp => {
        console.log(resp)
        Swal.fire({
          title: 'Has retirado el equipo correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#FD611A'
        })
        this.loadTravels()
      }, error =>{
        Swal.fire({
          title: 'Error inesperado, intenta nuevamente',
          icon: 'error',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#FD611A'
        })
      })} 
      else if (typeButton === "deliveredIt") {
      this.tr.postTravel(travelId, 4, userOperation, cadeteId, isReasigned).subscribe(resp => {
        console.log(resp)
        Swal.fire({
          title: 'Has entregado el equipo a Todoit correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#FD611A'
        })
        this.loadTravels()
      })
    } else if (typeButton === "obtained") {
      this.tr.postTravel(travelId, 7, userOperation, cadeteId, isReasigned).subscribe(resp => {
        console.log(resp)
        Swal.fire({
          title: 'Has retirado el equipo correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#FD611A'
        })
        this.loadTravels()
      }, error =>{
        Swal.fire({
          title: 'Error inesperado, intenta nuevamente',
          icon: 'error',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#FD611A'
        })
      })
    } else if (typeButton === "delivered") {
      this.tr.postTravel(travelId, 8, userOperation, cadeteId, isReasigned).subscribe(resp => {
        console.log(resp)
        Swal.fire({
          title: 'Has entregado el equipo a Todoit correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#FD611A'
        })
        this.loadTravels()
      }, error =>{
        Swal.fire({
          title: 'Error inesperado, intenta nuevamente',
          icon: 'error',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#FD611A'
        })
      })
    } else if (typeButton === "rejectFive") {
      this.tr.postTravel(travelId, 5, userOperation, cadeteId, true).subscribe(resp => {
        console.log(resp)
        Swal.fire({
          title: 'Rechazado correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#FD611A'
        })
        this.loadTravels()
      }, error =>{
        Swal.fire({
          title: 'Error inesperado, intenta nuevamente',
          icon: 'error',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#FD611A'
        })
      })}
  }


  loadTravels() {
    let two = this.tr.getTravel(2)
    let three = this.tr.getTravel(3)
    let six = this.tr.getTravel(6)
    let seven = this.tr.getTravel(7)

    forkJoin([two, three, six, seven])
      .subscribe(
        results => {
          this.travels = [...results[0], ...results[1], ...results[2], ...results[3]]
          this.loading = false
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
          console.log(this.haveTravels)

        });
  }
  ngOnInit(): void {
    this.loadTravels()
  }

}

