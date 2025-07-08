import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';

@Component({
  selector: 'app-noam-test',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './noam-test.component.html',
  styleUrl: './noam-test.component.scss',
})
export class NoamTestComponent {
  searchControl = new FormControl();
  filteredOptions!: Observable<any[]>;

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => of([{ caption: 'noam' }, { caption: 'noam2' }]))
    );
  }

  displayFn(option: any): string {
    return 'a';
    return option && option.caption ? option.caption : option.toString();
  }
}
