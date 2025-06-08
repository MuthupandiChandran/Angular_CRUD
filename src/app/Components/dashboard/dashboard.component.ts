import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalUsers = 0;
  activeUsers = 0;
  inactiveUsers = 0;
  roleDistribution: {role:string,count:number,percentage:number,color:string}[]=[];
  recentActivities = [
    { icon: 'person_add', message: 'New user Deepak registered', time: '5 minutes ago', color: '#1976d2' },
    { icon: 'edit', message: 'Priya updated her profile', time: '30 minutes ago', color: '#ff9800' },
    { icon: 'delete', message: 'User account deleted', time: '2 hours ago', color: '#f44336' },
    { icon: 'login', message: 'Amit logged in', time: '3 hours ago', color: '#4caf50' }
  ];

  constructor(private userService:UserService) {}

  ngOnInit():void{
    this.userService.getUsers().subscribe(users =>
    {
      this.totalUsers = users.length;
      this.activeUsers = users.filter(user=>user.active).length;
      this.inactiveUsers = this.totalUsers - this.activeUsers;

      //Calculate role distribution
      const roles:{[key:string]:number}={}; // any string can be used as key ex:"Admin","Manager" and number stored the respective key values 
      users.forEach(user => {
        roles[user.role] = (roles[user.role]||0)+1;
        // here we're checking the user's role count if user role exists count will be increased as 1 
        //otherwise it will be fallback as 0 
        //At the firsttime the count will be 1, 2 if already have once
      });


      const colors = ['#1976d2','#ff9800','#4caf50','#f44336','#9c27b0'];
      let i =0;

      for(const role in roles)
      {
          this.roleDistribution.push({
            role,
            count:roles[role],
            percentage:(roles[role]/this.totalUsers)*100,
            color:colors[i%colors.length] // if colors.length is 5, and i is 7, then 7 % 5 = 2, so it will use the color at index 2
            //This way, you can have any number of roles, and the color selection will cycle through the colors in the array without going out of bounds.
          });
          i++;
      }
    });
  }

}
