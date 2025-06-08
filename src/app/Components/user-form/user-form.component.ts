import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{

userForm:FormGroup = new FormGroup({}); //empty form ,or Initialize later
isEditMode:boolean = false;
userId:number |null = null;

ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        this.loadUserData();
      }
    });
  }

constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: ['User', Validators.required],
      active: [true]
    });
  }


  loadUserData() {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(user => {
        if (user) {
          this.userForm.patchValue({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            active: user.active
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
const userData: User = {
      id: this.userId || 0,
      ...this.userForm.value
    };

     if (this.isEditMode) {
      this.userService.updateUser(userData).subscribe(() => {
        this.showSuccessMessage('User updated successfully');
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.addUser(userData).subscribe(() => {
        this.showSuccessMessage('User created successfully');
        this.router.navigate(['/users']);
      });

    }
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }

}
