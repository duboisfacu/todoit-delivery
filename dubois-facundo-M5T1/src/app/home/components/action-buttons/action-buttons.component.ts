import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.sass']
})
export class ActionButtonsComponent implements OnInit {

  public active!:boolean

  constructor(private router: Router) { }
  navigate(prop:string) {
    if (prop === ''){
      localStorage.clear()
    }

    this.router.navigate([`${prop}`]);
}

  ngOnInit(): void {
    if(this.router.url === '/home'){
      this.active = false
    }else{
      this.active = true
    }
  }
}