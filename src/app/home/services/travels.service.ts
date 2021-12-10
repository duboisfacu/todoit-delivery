import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Travel } from '../model/travel';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {

  constructor(private http:HttpClient) { }


  getTravel(status: number): Observable <Travel[]> {
    return this.http.get < Travel []> (`/api/Travel/2/${status}`)
  }

  postTravel(travelId: number, statusTravel: number, userOperation: number, cadeteId : number, isReasigned: boolean ): Observable < Travel > {
    return this.http.post < Travel > (`/api/Travel?travelId=${travelId}&statusTravel=${statusTravel}&userOperation=${userOperation}&cadeteId=${cadeteId}&isReasigned=${isReasigned}` , 
    [travelId, statusTravel, userOperation,cadeteId,isReasigned] )
  }


}
