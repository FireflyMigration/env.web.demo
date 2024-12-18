import { Component, inject, Input } from '@angular/core';
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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UIService } from '../ui.service';

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
  ],
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
  doOnSubmit() {
    this.options.onSubmit(this.dynamicForm.value);
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
}

export type DynamicFormSettingsOptions<T> = {
  fieldsConfig: FieldsConfig<T>;
  onSubmit: (val: T) => Promise<void>;
  defaultValues?: Partial<T>;
};
