import { Component, Input } from '@angular/core';
import type { DataApi, EntityWithId } from '../data-api-for';
import type { FieldConfig } from '../field-config';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-data-grid',
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
})
export class DataGridComponent<T extends EntityWithId> {
  handleRowAction(_: MouseEvent, row: DataGridRow<T>, action: RowAction<T>) {
    action.onClick(row.row);
  }
  sortData(e: Sort) {
    this.settings.sortByColumn = e.active;
    this.settings.sortByColumnDirection = e.direction;
    this.settings.loadData();
  }
  getRowDisplayData(row: DataGridRow<T>, column: FieldConfig) {
    const val = row.row[column.key as keyof T];
    let display = row.columnsDisplayValues[column.key];
    if (!display) {
      display = { value: 'loading' };
      async function displayTheValue() {
        display.value = (await column.displayValue(val)) ?? '';
      }
      displayTheValue();
      row.columnsDisplayValues[column.key] = display;
    }
    return display.value;
  }
  @Input() settings!: DataGridSettings<T>;
  ngOnInit() {
    this.settings.loadData();
  }
  handlePageEvent(e: PageEvent) {
    this.settings.pageIndex = e.pageIndex;
    this.settings.pageSize = e.pageSize;
    this.settings.loadData();
  }
}

export type RowAction<T> = {
  text: string;
  onClick: (item: T) => void;
  icon: string;
};

export class DataGridSettings<T extends EntityWithId> {
  constructor(
    private api: DataApi<T>,
    public options: {
      columns: (string & keyof T)[];
      rowActions?: RowAction<T>[];
    }
  ) {
    this.columns = api.toFieldsArray(...options.columns);
  }
  rows: DataGridRow<T>[] = [];
  columns!: FieldConfig[];
  totalRows = -1;
  pageSize = 10;
  pageIndex = 0;
  sortByColumn = '';
  sortByColumnDirection = '';
  loading = false;

  async loadData() {
    try {
      this.loading = true;
      [this.rows, this.totalRows] = await Promise.all([
        this.api
          .getMany({
            _order: this.sortByColumnDirection,
            _sort: this.sortByColumn,
            _limit: this.pageSize,
            _page: this.pageIndex,
          })
          .then((y) => y.map((x) => ({ row: x, columnsDisplayValues: {} }))),
        this.api.count(),
      ]);
    } finally {
      this.loading = false;
    }
  }
}

type DataGridRow<T> = {
  row: T;
  columnsDisplayValues: Record<string, { value: string }>;
};
