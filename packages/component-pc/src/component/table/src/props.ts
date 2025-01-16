import { PropType } from 'vue'
import type { TableColumnCtx as TableColumnCtxEx } from 'element-plus'
export interface TableColumnRender<T=any> {
  curRowIndex: number|string
  row: T,
  data: T[],
}

export interface TableColumnCtx extends TableColumnCtxEx<any> {
  render?: (data:TableColumnRender) => any;
};

export interface TableProps {
  data?: any[],
  columns?: TableColumnCtx[],
  stripe?: boolean,
  showIndex?: boolean,
  showSelection?:boolean
}

export const shareProp = {
  data: {
    type: Array as PropType<TableProps['data']>,
    default: () => []

  },
  columns: {
    type: Array as PropType<TableProps['columns']>,
    default: () => []
  }
}

