import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BusyService, DataControlInfo, GridSettings, IDataSettings, openDialog } from '@remult/angular';
import { Entity, Remult, Filter, Sort, SortSegment, AndFilter, FieldMetadata, Repository } from 'remult';

@Component({
  selector: 'app-select-popup',
  templateUrl: './select-popup.component.html',
  styleUrls: ['./select-popup.component.scss']
})
export class SelectPopupComponent {
  constructor(private dialogRef: MatDialogRef<any>, private remult: Remult, private busy: BusyService) {
  }
  search() {
    this.busy.donotWait(async () => {
      await this.settings.reloadData();
    })


  }
  searchFieldCaption() {

    if (this.searchField)
      return this.searchField.caption;
    return "";
  }
  searchText: string = '';
  private searchField!: FieldMetadata;
  settings!: GridSettings<any>;
  onOk!: (selected: any) => void;
  config<T>(remultForEntity: Repository<T>, settings: IDataSettings<T> & { onSelect: (selected: T) => void }) {
    this.onOk = settings.onSelect;

    let searchWhere = new Filter(x => {
      if (this.searchField && this.searchText)
        x.containsCaseInsensitive(this.searchField, this.searchText);
    });

    if (!settings.where) {
      settings.where = () => searchWhere;
    }
    else {
      let y = settings.where;
      settings.where = e => Filter.fromEntityFilter(e, y, () => searchWhere);
    }
    if (!settings.rowsInPage) {
      settings.rowsInPage = 50;
    }
    this.settings = new GridSettings(remultForEntity, settings);
    this.settings.reloadData().then(() => {

      if (!this.searchField) {
        for (let col of this.settings.columns.items) {
          let colDefs = col.field as FieldMetadata;
          if (col.field && colDefs.valueType === String && colDefs.key != "id" && (!col.inputType || col.inputType == "text")) {
            this.searchField = colDefs;
            break;
          }
        }
      }
    })
  }

  close() {
    this.dialogRef.close();
  }
  select() {
    this.onOk(this.settings.currentRow);
    this.dialogRef.close();
  }
}