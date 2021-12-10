import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home.component';
import { MytravelComponent } from './mytravel/mytravel.component';
import { TravelsComponent } from './travels/travels.component';

const routes: Routes = [
  {path: 'travels', component: TravelsComponent},
  {path: 'mytravels', component: MytravelComponent},
  {path: 'history', component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
