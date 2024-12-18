import { inject, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  type MatDialogConfig,
} from '@angular/material/dialog';
import { YesNoQuestionComponent } from './yes-no-question/yes-no-question.component';
import type { DynamicFormSettingsOptions } from './dynamic-form/dynamic-form.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';

@Injectable({
  providedIn: 'root',
  deps: [MatDialogModule],
})
export class UIService {
  constructor() {}
  dialog = inject(MatDialog);
  async yesNoQuestion(question: string) {
    return await this.openDialog(
      YesNoQuestionComponent,
      (d) => (d.args = { message: question }),
      (d) => d.okPressed
    );
  }
  async info(question: string) {
    return await this.openDialog(
      YesNoQuestionComponent,
      (d) => (d.args = { message: question, isAQuestion: false })
    );
  }
  async formDialog<T>(
    options: {
      title: string;
    } & DynamicFormSettingsOptions<T>
  ) {
    return await this.openDialog(
      FormDialogComponent,
      (d) => (d.args = options)
    );
  }
  async openDialog<T, C>(
    component: { new (...args: any[]): C },
    setParameters?: (it: C) => void,
    returnAValue?: (it: C) => T
  ): Promise<T> {
    let ref = this.dialog.open(
      component,
      (component as any)[dialogConfigMember]
    );
    if (setParameters) setParameters(ref.componentInstance);
    (ref.componentInstance as WantsToCloseDialog).closeDialog = () =>
      ref.close();
    var r;
    if (ref.beforeClosed) r = await ref.beforeClosed().toPromise();
    //@ts-ignore
    else r = await ref.beforeClose().toPromise();
    if (returnAValue) return returnAValue(ref.componentInstance);
    return r;
  }
}

export interface WantsToCloseDialog {
  closeDialog: VoidFunction;
}

const dialogConfigMember = Symbol('dialogConfigMember');

export function DialogConfig(config: MatDialogConfig) {
  return function (target: any) {
    target[dialogConfigMember] = config;
    return target;
  };
}
