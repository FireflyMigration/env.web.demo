import { Injectable } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { YesNoQuestionComponentData, YesNoQuestionComponent } from './yes-no-question/yes-no-question.component';
  
@Injectable()
export class DialogService {
    Info(info: string): any {
        this.snackBar.open(info, "close", { duration: 4000 });
    }
    Error(err: string): any {
        this.YesNoQuestion(err);
    }

    constructor(private dialog: MatDialog,   private snackBar: MatSnackBar) {

    }
   
    YesNoQuestion(question: string, onYes?: () => void) {
        let data: YesNoQuestionComponentData = {
            question: question,
            onYes: onYes
        };
        this.dialog.open(YesNoQuestionComponent, { data });
    }
 
}
