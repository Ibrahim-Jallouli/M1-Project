import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  username: string | null = localStorage.getItem("username");
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('newPassword')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onChangePassword() {
    if (this.passwordForm.valid) {
      const newPassword = this.passwordForm.get('newPassword')?.value;
      // Call the service to change the password
      console.log('Password changed to: ', newPassword);
    } else {
      console.log('Form is invalid');
    }
  }
}
