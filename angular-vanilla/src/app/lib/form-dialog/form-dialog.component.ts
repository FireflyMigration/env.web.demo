import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import type { WantsToCloseDialog } from '../ui.service';
import {
  DynamicFormSettingsOptions,
  DynamicFormComponent,
  DynamicFormSettings,
} from '../dynamic-form/dynamic-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-form-dialog',
  imports: [
    MatDialogModule,
    DynamicFormComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class FormDialogComponent implements WantsToCloseDialog {
  closeDialog!: VoidFunction;
  args!: {
    title?: string;
  } & DynamicFormSettingsOptions<any>;
  settings!: DynamicFormSettings<any>;
  submitting = false;
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
    try {
      this.submitting = true;
      await this.settings.doOnSubmit();
    } finally {
      this.submitting = false;
    }
  }
}
