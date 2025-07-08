import { Component, OnInit } from '@angular/core';
import type { WantsToCloseDialog } from '../ui.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-yes-no-question',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './yes-no-question.component.html',
  styleUrls: ['./yes-no-question.component.scss'],
})
export class YesNoQuestionComponent implements OnInit, WantsToCloseDialog {
  okPressed = false;
  args!: {
    message: string;
    isAQuestion?: boolean;
  };

  closeDialog!: VoidFunction;

  ngOnInit() {
    if (this.args.isAQuestion === undefined) this.args.isAQuestion = true;
  }

  select() {
    this.closeDialog();
    this.okPressed = true;
  }
}
