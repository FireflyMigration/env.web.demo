import { Component, forwardRef, inject, Input } from '@angular/core';
import {
  fieldConfigFor,
  type FieldConfig,
  type FieldsConfig,
} from '../field-config';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  type FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UIService } from '../ui.service';
import { EntityError } from '../data-api-for';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { SelectIdFieldComponent } from '../select-id-field/select-id-field.component';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    SelectIdFieldComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent<T> {
  fb = inject(FormBuilder);
  ui = inject(UIService);
  @Input() settings!: DynamicFormSettings<T>;

  ngOnInit() {
    this.settings.initForm(this.fb, this.ui);
  }
  onSubmit() {
    this.settings.doOnSubmit();
  }
  @Input() showSubmit = true;
}

export class DynamicFormSettings<T> {
  ui!: UIService;

  submitting = false;
  async doOnSubmit() {
    try {
      this.submitting = true;
      await this.options.onSubmit(this.dynamicForm.value);
    } catch (e) {
      if (e instanceof EntityError) {
        for (const field of this.formFields) {
          if (e.errors?.[field.key]) {
            this.dynamicForm.get(field.key)?.setErrors({
              error: e.errors[field.key],
            });
          }
          this.ui.info(e.message);
        }
      } else if (e instanceof Error) {
        this.ui.info(e.message);
      }
    } finally {
      this.submitting = false;
    }
  }
  constructor(private options: DynamicFormSettingsOptions<T>) {
    this.formFields = fieldConfigFor<T>(options.fieldsConfig).toFieldsArray();
  }
  formFields: FieldConfig[];
  dynamicForm!: FormGroup;
  initForm(fb: FormBuilder, ui: UIService) {
    this.ui = ui;
    let group: any = {};
    function getValidators(field: FieldConfig) {
      let validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.type === 'email') validators.push(Validators.email);
      return validators;
    }
    this.formFields.forEach((field) => {
      group[field.key] = [
        field.defaultValue ??
          this.options.defaultValues?.[field.key as keyof T] ??
          '',
        getValidators(field),
      ];
    });
    this.dynamicForm = fb.group(group);
  }
  getFieldErrorText(field: FieldConfig) {
    const error = this.dynamicForm.get(field.key)?.errors;
    return (
      (error?.['required'] && field.label + ' is required') ?? error?.['error']
    );
  }
}

export type DynamicFormSettingsOptions<T> = {
  fieldsConfig: FieldsConfig<T>;
  onSubmit: (val: T) => Promise<void>;
  defaultValues?: Partial<T>;
};
