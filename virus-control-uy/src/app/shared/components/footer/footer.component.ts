import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailField: FormControl;

  constructor() {
    this.emailField = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
  }

  ngOnInit() {
  }

  sendMail() {
    if (this.emailField.valid) {
      console.log(this.emailField.value);
    }
  }

}
