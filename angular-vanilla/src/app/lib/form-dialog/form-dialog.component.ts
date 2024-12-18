import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import type { WantsToCloseDialog } from '../ui.service';
import {
  DynamicFormSettingsOptions,
  DynamicFormComponent,
  DynamicFormSettings,
} from '../dynamic-form/dynamic-form.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-dialog',
  imports: [MatDialogModule, DynamicFormComponent, MatButtonModule],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class FormDialogComponent implements WantsToCloseDialog {
  closeDialog!: VoidFunction;
  args!: {
    title: string;
  } & DynamicFormSettingsOptions<any>;
  settings!: DynamicFormSettings<any>;
  ngOnInit() {
    this.settings = new DynamicFormSettings({
      ...this.args,
      onSubmit: async (val) => {
        await this.args.onSubmit(val);
        this.closeDialog();
      },
    });
  }
  async confirm() {
    this.settings.doOnSubmit();
  }
}
