import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'form-app';
  userForm: FormGroup;
  userName: string = 'Pankaj Kumar';
  lastName: string = 'Something';
  userData: string = '';
  userEnterEvent = new Subject();
  temperature: Number = 0;
  selectedType = new Subject();
  tempreatureSubject = new Subject();

  constructor(private fb: FormBuilder) {
    this.userForm = fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl(0, [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      address: new FormControl('', [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      consent: new FormControl(false, [Validators.required]),
    });
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  ngOnInit(): void {
    this.getUserInputData();
    this.getTemp();
  }

  submitForm() {
    console.log(this.userForm.value, this.userForm.valid);
  }

  getUserInputData() {
    this.userEnterEvent
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((data) => {
        console.log('data', data);
      });
  }

  onOptionsSelected(value: string) {
    console.log(value);
    console.log('check something');
    this.selectedType.next(value);
  }

  getTemp() {
    combineLatest([this.tempreatureSubject, this.selectedType]).subscribe({
      next: ([temp, selectVal]) => console.log(temp, selectVal),
    });
  }
}
