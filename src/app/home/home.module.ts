import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MytravelComponent } from './mytravel/mytravel.component';
import { HistoryComponent } from './history/history.component';
import { TravelsComponent } from './travels/travels.component';
import { ButtonsComponent } from './components/buttons/buttons.component';


@NgModule({
  declarations: [
    HomeComponent,
    MytravelComponent,
    HistoryComponent,
    TravelsComponent,
    ButtonsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
