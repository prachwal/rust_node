import React, { JSX } from 'react';

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  style?: React.CSSProperties;
  format?: (value: any) => JSX.Element;
}
