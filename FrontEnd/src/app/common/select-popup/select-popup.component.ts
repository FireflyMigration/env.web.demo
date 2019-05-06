import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Entity, GridSettings, IDataSettings, Column, StringColumn } from 'radweb';

@Component({
  selector: 'app-select-popup',
  templateUrl: './select-popup.component.html',
  styleUrls: ['./select-popup.component.scss']
})
export class SelectPopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SelectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectPopupArgs) {
    

  }
  search() {
    this.data.settings.get({ where: x => this.searchColumn.isContains(this.searchText ) });

  }
  searchColumnCaption() {
    
    if (this.searchColumn)
      return this.searchColumn.caption;
    return "";
  }
  searchText: string;
  private searchColumn: StringColumn;

  async ngOnInit() {
    await this.data.settings.getRecords();
    if (!this.searchColumn) {
      for (let col of this.data.settings.columns.items) {
        if (col.column instanceof StringColumn && col.column && col.column.jsonName != "id" && (!col.inputType || col.inputType == "text")) {
          this.searchColumn = col.column;
          break;
        }
      }
    }
  }
  close() {
    this.dialogRef.close();
  }
  select() {
    this.data.onOk(this.data.settings.currentRow);
    this.dialogRef.close();
  }
}


@Injectable()
export class SelectService {
  constructor(private dialog: MatDialog) {

  }


  show<T extends Entity<any>>(entity: T, ok: (selected: T) => void, settings?: IDataSettings<T>) {

    let data = {
      onOk: ok,
      settings: new GridSettings(entity, settings ? settings : {
        caption: entity.__getCaption()
      })
    } as SelectPopupArgs;
    this.dialog.open(SelectPopupComponent, { data });
  }
}
export interface SelectPopupArgs {

  settings: GridSettings<any>;
  onOk: (select: Entity<any>) => void;
}