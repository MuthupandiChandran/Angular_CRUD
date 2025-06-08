import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable,BehaviorSubject } from "rxjs";
import {User} from '../models/user.model';

@Injectable ({
providedIn: 'root'
})

export class UserService {
    private apiUrl = 'https://api.example.com/Users'   //Replace with your actual api url
    private users$ = new BehaviorSubject<User[]>([]);

    //mock data for demonstration

private mockUsers: User[] = [
{id:1,name:'Rahul Sharma',email:'rahule@example.com',phone:'9876543210',role:'Admin',active:true},
{id:2,name:'Priya Patel',email:'priya@example.com',phone:'8765432109',role:'User',active:true},
{id:3,name:'Amit Kumar',email:'amit@example.com',phone:'7654321098',role:'Manager',active:false},
{id:4,name:'Anjali Singh',email:'anjali@example.com',phone:'6543210987',role:'User',active:true}
];

constructor(private http:HttpClient) {
      //Initialize with mock user data
    this.users$.next(this.mockUsers);
}


getUsers():Observable<User[]>{
        //for a real API:
    //return this.http.get<User[]>(this.apiUrl);

//using mock data
    return this.users$.asObservable();
}

getUserById(id:number): Observable<User>{
    const url =  `${this.apiUrl}/${id}`;
      //for a real API:
    //return this.http.get<User>(url);

    //Using Mock Data
    const user = this.mockUsers.find(u=>u.id==id);
    return new Observable(observer =>{
       if(user){
        observer.next(user);
       }
       else{
        observer.error(new Error('User Not Found'));
       }
       observer.complete();
    });
}


addUser(user:User):Observable<User>{
//for a real API :
//return this.http.Post<User>(this.apiUrl,user);

//using Mock Data
const newUser= {...user,id:this.mockUsers.length+1};
this.mockUsers.push(newUser);
this.users$.next([...this.mockUsers]);

return new Observable(observer => {

    if(newUser)
    {
        observer.next(newUser);
    }
    else
    {
          observer.error(new Error(`User Can't able to add`));
    }
    observer.complete();

    this.addUser(newUser).subscribe({
        next:(value) => console.log('Next:',value),
        error:(err) => console.log('Error:',err.message),
        complete:()=>console.log('Add User Complete'),
    });

});

}


updateUser(user:User):Observable<User>{
  const url = `${this.apiUrl}/${user.id}`;
  //for a real API:
  //return this.http.put<User>(url,user);

  //using mock data
  const index = this.mockUsers.findIndex(u=>u.id==user.id);
  if(index!== -1)
  {
    this.mockUsers[index] = user; // for update the new value in the array
    this.users$.next([...this.mockUsers]);
  }
return new Observable(observer=>
{
    observer.next(user);
    observer.complete();

});
}

deleteUser(id:number):Observable<void> {
const url = `${this.apiUrl}/${id}`;
//for a real API;
//return this.http.delete<void>(url);

//using mock data
const index = this.mockUsers.findIndex(u=>u.id==id);
if(index!== -1)
{
     this.mockUsers.splice(index,1);
     this.users$.next([...this.mockUsers]);
}
return new Observable(observer => {
    observer.next();
    observer.complete();
});
}



}

