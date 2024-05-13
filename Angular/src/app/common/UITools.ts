import { FieldRef, Remult, ValueListItem } from 'remult';

import {
  DataAreaFieldsSetting,
  GridSettings,
} from '../common-ui-elements/interfaces';

export interface UITools {
  yesNoQuestion: (question: string) => Promise<boolean>;
  info: (info: string) => void;
  error: (err: any) => void;
  gridDialog(args: GridDialogArgs): Promise<void>;
  areaDialog(args: AreaDialogArgs): Promise<void>;

  selectValuesDialog<
    T extends {
      caption?: string;
    }
  >(args: {
    values: T[];
    onSelect: (selected: T) => void;
    title?: string;
  }): Promise<void>;
  multiSelectValueDialog<T>(args: MultiSelectOptions<T>): Promise<void>;
}

export interface MultiSelectOptions<T> {
  values: T[];
  selected?: T[];
  onSelect: (selected: T[]) => void;
  getCaption: (item: T) => string;
  title?: string;
}

export interface customInputOptions<entityType> {
  textarea(): void;
}

declare module 'remult' {
  // Adding options to the remult's Field Options interface
  export interface FieldOptions<entityType, valueType> {
    clickWithUI?: (
      ui: UITools,
      entity: entityType,
      fieldRef: FieldRef<valueType>
    ) => void;
    customInput?: (inputOptions: customInputOptions<entityType>) => void;
    valueList?:
      | ValueListItem[]
      | string[]
      | any[]
      | Promise<ValueListItem[]>
      | ((remult: Remult) => Promise<ValueListItem[]>)
      | ((remult: Remult) => ValueListItem[]);
    width?: string;
  }
}

export interface GridDialogArgs {
  title: string;
  settings: GridSettings<any>;
  ok?: () => void;
  cancel?: () => void;
  validate?: () => Promise<void>;
  buttons?: button[];
}
export interface button {
  text: string;
  click: (close: () => void) => void;
  visible?: () => boolean;
}
export interface AreaDialogArgs {
  title?: string;
  helpText?: string;
  fields: DataAreaFieldsSetting<any>[];
  ok: () => void;
  cancel?: () => void;
  validate?: () => Promise<void>;
  buttons?: button[];
}
