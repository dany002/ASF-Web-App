import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  contactForm!: FormGroup;

  constructor(
    private form_builder: FormBuilder
  ) {}

  ngOnInit() {
    this.contactForm = this.form_builder.group({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  }

  onSubmit() {

  }
}
