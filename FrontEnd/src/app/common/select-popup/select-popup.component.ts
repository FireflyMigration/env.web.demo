import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Entity, GridSettings, IDataSettings, StringColumn, Context, Column, ColumnSetting, BusyService } from '@remult/core';

@Component({
  selector: 'app-select-popup',
  templateUrl: './select-popup.component.html',
  styleUrls: ['./select-popup.component.scss']
})
export class SelectPopupComponent {
  constructor(private dialogRef: MatDialogRef<any>, private context: Context,private busy:BusyService) {
  }
  search() {
    this.busy.donotWait(async ()=>{
    await this.settings.getRecords();
  })
    

  }
  searchColumnCaption() {

    if (this.searchColumn)
      return this.searchColumn.caption;
    return "";
  }
  searchText: string;
  private searchColumn: StringColumn;
  settings: GridSettings<any>;
  onOk: (selected: Entity<any>) => void;
  async set<T extends Entity<any>>(c: { new(...args: any[]): T; }, onOk: (selected: T) => void, settings?: IDataSettings<T>) {
    this.onOk = onOk;
    if (!settings) {
      settings = {};
    }
    if (!settings.get) {
      settings.get = {};
    }
    if (!settings.get.where) {
      settings.get.where = x => this.searchText ? this.searchColumn.isContains(this.searchText) : undefined;
    }
    else {
      let y = settings.get.where;
      settings.get.where = x => this.searchText ? this.searchColumn.isContains(this.searchText).and(y(x)) : y(x);
    }
    if (!settings.get.limit){
      settings.get.limit=50;
    }
    this.settings = this.context.for(c).gridSettings(settings);
    await this.settings.getRecords();
    if (!this.searchColumn) {
      for (let col of this.settings.columns.items) {
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
    this.onOk(this.settings.currentRow);
    this.dialogRef.close();
  }
}
function getColumnFromEntity<T extends Column<any>>(column: T, entity: Entity<any>): T {
  if (!entity)
    return column;
  else return <T>entity.__getColumn(column);
}
export function columnWithSelectPopupAndGetValue<T, fromEntity extends Entity<any>>(
  context: Context,
  column: Column<T>,
  fromEntity: { new(...args: any[]): fromEntity; },
  args: columnWithSelectPopupAndGetValueArgs<fromEntity, T>
): ColumnSetting<any> {

  if (!args) {
    args = {};
  }
  if (!args.getDescription) {
    for (let col of context.for(fromEntity).create().__iterateColumns()) {
      if (col instanceof StringColumn && col.jsonName != "id" && (!col.inputType || col.inputType == "text")) {
        args.getDescription = x => getColumnFromEntity(column, x);
        break;
      }
    }
  }
  if (!args.getIdColumn) {
    args.getIdColumn = x => x.__idColumn;
  }
  return {
    column: column,
    width: args.width,
    getValue: orders => args.getDescription(context.for(fromEntity).lookup(getColumnFromEntity(column, orders))),
    click: orders => context.openDialog(SelectPopupComponent, s => s.set(fromEntity, c => {
      getColumnFromEntity(column, orders).value = args.getIdColumn(c).value;
    }, args.popupSettings), x => { })
  };
}
export interface columnWithSelectPopupAndGetValueArgs<fromEntity extends Entity<any>, T> {
  getDescription?: (e: fromEntity) => any,
  getIdColumn?: (e: fromEntity) => Column<T>,
  popupSettings?: IDataSettings<fromEntity>,
  width?: string

}


