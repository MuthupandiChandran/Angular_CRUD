import { Component,OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import{User} from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent implements OnInit {

   displayedColumns: string[] = ['id','name','email','phone','role','status','actions'];
   dataSource = new MatTableDataSource<User>([]);
   selectedUser: User | null = null;


   @ViewChild(MatPaginator) paginator!:MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild('delete dialog') deleteDialog:any;


   constructor(
    private userService:UserService,
    private dialog:MatDialog,
    private router: Router
   ){}

ngOnInit(): void {
     this.loadUsers();
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   }

   loadUsers(){
    this.userService.getUsers().subscribe(users=>{
      this.dataSource.data = users;
    });
  }

  applyFilter(event:Event):void{
    const filterValue = (event?.target as HTMLInputElement)?.value||'';
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addUser() {
    this.router.navigate(['/users/new']);
  }

  editUser(user: User) {
    this.router.navigate(['/users/edit', user.id]);
  }

  toggleStatus(user: User) {
    user.active = !user.active; // if the user active it will become as false (non-active)
    //if it false,it will change it as active(true)
    this.userService.updateUser(user).subscribe();
  }

  confirmDelete(user: User) {
    this.selectedUser = user;
    const dialogRef = this.dialog.open(this.deleteDialog);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser();
      }
    });
  }

   deleteUser() {
    if (this.selectedUser) {
      this.userService.deleteUser(this.selectedUser.id).subscribe(() => {
        this.loadUsers();
        this.dialog.closeAll();
      });
    }
  }
}
