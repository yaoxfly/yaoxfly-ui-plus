import { PropType } from 'vue'
import type { TableColumnCtx as TableColumnCtxEx } from 'element-plus'
export interface Render<T=any> {
  row: T,
  data: T[],
  curRowIndex: number|string
}

export interface TableColumnCtx extends TableColumnCtxEx<any> {
  render?: (data:Render) => any;
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

