import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  type AbstractControl,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  debounceTime,
  distinctUntilChanged,
  from,
  of,
  switchMap,
  type Observable,
} from 'rxjs';
import type { IdSelectFieldConfig } from '../select-from';
import type { FieldConfig } from '../field-config';

@Component({
  selector: 'app-select-id-field',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './select-id-field.component.html',
  styleUrl: './select-id-field.component.scss',
})
export class SelectIdFieldComponent {
  @Input() theFormControl!: AbstractControl<any, any>;
  @Input() label = '';
  @Input() config!: IdSelectFieldConfig & FieldConfig;
  searchControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  async ngOnInit() {
    this.searchControl.setValue({
      id: this.theFormControl.value,
      caption: await this.config.displayValue(this.theFormControl.value),
    });
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => from(this.config.getOptions(value)))
    );
  }

  displayFn(option: any): string {
    if (option == null) return '';
    return option.caption;
  }
}
