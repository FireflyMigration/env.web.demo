import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-yes-no-question',
  templateUrl: './yes-no-question.component.html',
  styleUrls: ['./yes-no-question.component.scss']
})
export class YesNoQuestionComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<YesNoQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: YesNoQuestionComponentData
  ) {
    
  }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }
  select() {
    this.dialogRef.close();
    this.data.onYes();
  }
}
export interface YesNoQuestionComponentData {
  onYes: () => void,
  question: string;
}