import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'form-app';
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl(0, [
        Validators.required,
        Validators.minLength(10),
      ]),
      address: new FormControl('', [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      consent: new FormControl(false, [Validators.required]),
    });
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  submitForm() {
    console.log(this.userForm.value, this.userForm.valid);
  }
}
