import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { fieldConfigFor, type FieldConfig } from '../lib/field-config';
import { dataApiFor } from '../lib/data-api-for';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noam-test',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './noam-test.component.html',
  styleUrl: './noam-test.component.scss',
})
export class NoamTestComponent {
  dynamicForm!: FormGroup;
  formFields: FieldConfig[] = fieldConfigFor<SignInInfo>({
    username: {},
    password: { type: 'password' },
  }).toFieldsArray('username', 'password');

  // [
  //   { key: 'name', label: 'Name', type: 'text', required: true },
  //   { key: 'email', label: 'Email', type: 'email', required: true },
  //   {
  //     key: 'agree',
  //     label: 'Agree to terms',
  //     type: 'checkbox',
  //     required: true,
  //   },
  //   {
  //     key: 'country',
  //     label: 'Country',
  //     type: 'select',
  //     options: ['USA', 'Canada', 'UK'],
  //     required: true,
  //   },
  // ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }
  onSubmit() {
    console.log(this.dynamicForm.value);
  }

  createForm() {
    let group: any = {};
    this.formFields.forEach((field) => {
      group[field.key] = ['', this.getValidators(field)];
    });
    this.dynamicForm = this.fb.group(group);
  }

  getValidators(field: FieldConfig) {
    let validators = [];
    if (field.required) validators.push(Validators.required);
    if (field.type === 'email') validators.push(Validators.email);
    return validators;
  }
}

type SignInInfo = {
  username: string;
  password: string;
};
const defs = fieldConfigFor<SignInInfo>({
  username: {},
  password: { type: 'password' },
});
defs.toFieldsArray('username', 'password');
