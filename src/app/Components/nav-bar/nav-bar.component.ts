import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
     sidenavOpen = false;

     toggleSidenav(){
      this.sidenavOpen = !this.sidenavOpen;
     }

     closeSidenav(){
      this.sidenavOpen = false;
     }


}
