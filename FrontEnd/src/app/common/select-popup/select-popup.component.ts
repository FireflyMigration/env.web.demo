import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Entity, GridSettings, IDataSettings, StringColumn, Context, Column,  BusyService, Filter, Sort, SortSegment, FilterBase, AndFilter, DataControlInfo } from '@remult/core';

@Component({
  selector: 'app-select-popup',
  templateUrl: './select-popup.component.html',
  styleUrls: ['./select-popup.component.scss']
})
export class SelectPopupComponent {
  constructor(private dialogRef: MatDialogRef<any>, private context: Context, private busy: BusyService) {
  }
  search() {
    this.busy.donotWait(async () => {
      await this.settings.getRecords();
    })


  }
  searchColumnCaption() {

    if (this.searchColumn)
      return this.searchColumn.defs.caption;
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
    if (!settings.get.limit) {
      settings.get.limit = 50;
    }
    this.settings = this.context.for(c).gridSettings(settings);
    await this.settings.getRecords();
    if (!this.searchColumn) {
      for (let col of this.settings.columns.items) {
        if (col.column instanceof StringColumn && col.column && col.column.defs.key != "id" && (!col.inputType || col.inputType == "text")) {
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
  else return <T>entity.columns.find(column);
}
export function columnWithSelectPopupAndGetValue<T, fromEntity extends Entity<any>>(
  context: Context,
  column: Column<T>,
  fromEntity: { new(...args: any[]): fromEntity; },
  args: columnWithSelectPopupAndGetValueArgs<fromEntity, T>
): DataControlInfo<any> {

  if (!args) {
    args = {};
  }
  if (!args.getDescription) {
    for (let col of context.for(fromEntity).create().columns) {
      if (col instanceof StringColumn && col.defs.key != "id" ) {
        args.getDescription = x => getColumnFromEntity(col, x);
        break;
      }
    }
  }
  if (!args.getIdColumn) {
    args.getIdColumn = x => x.columns.idColumn;
  }
  let lookupWhere = (row, e) => <FilterBase>args.getIdColumn(e).isEqualTo(getColumnFromEntity(column, row));
  if (args.where) {
    let x = lookupWhere;
    lookupWhere = (row, e) => new AndFilter(x(row, e), args.where(e, row));

  }

  return {
    column: column,
    width: args.width,
    getValue: orders => args.getDescription(context.for(fromEntity).lookup(e => lookupWhere(orders, e))),
    hideDataOnInput: args.hideDataOnInput,
    click: theRowThatWasClicked => {
      let popupSettings: IDataSettings<fromEntity> = { get: {} };
      if (args.where)
        popupSettings.get.where = e => args.where(e, theRowThatWasClicked);
      if (args.orderBy) {
        popupSettings.get.orderBy = args.orderBy;
      }
      if (args.numOfColumnsInGrid) {
        popupSettings.numOfColumnsInGrid = args.numOfColumnsInGrid;
      }
      if (args.popupColumnSettings) {
        popupSettings.columnSettings = args.popupColumnSettings;
      }
      else
        popupSettings.columnSettings = e => args.getDescription(e);

      context.openDialog(SelectPopupComponent, s => s.set(fromEntity, c => {
        getColumnFromEntity(column, theRowThatWasClicked).value = args.getIdColumn(c).value;
        if (args.afterSelect)
          args.afterSelect(c,theRowThatWasClicked);
      }, popupSettings));
    }
  };
}
export interface columnWithSelectPopupAndGetValueArgs<fromEntity extends Entity<any>, T> {
  getDescription?: (e: fromEntity) => any,
  getIdColumn?: (e: fromEntity) => Column<T>,
  where?: (e: fromEntity, row: Entity<any>) => Filter,
  orderBy?: ((rowType: fromEntity) => Sort) | ((rowType: fromEntity) => (Column<any>)) | ((rowType: fromEntity) => (Column<any> | SortSegment)[]);
  popupColumnSettings?: (row: fromEntity) => DataControlInfo<fromEntity>[];
  numOfColumnsInGrid?: number;
  hideDataOnInput?: boolean;
  afterSelect?: (e: fromEntity,x:Entity<any>) => any,
  width?: string

}


