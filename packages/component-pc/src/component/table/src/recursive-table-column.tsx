import { defineComponent } from 'vue'
import { ElTableColumn } from 'element-plus'
import { shareProp, TableColumnCtx } from './types'

const RecursiveTableColumn = defineComponent({
  name: 'RecursiveTableColumn',
  props: shareProp,
  setup(props) {
    // 渲染逻辑函数
    const renderColumnContent = (item: TableColumnCtx, scope: { row: Record<string, any>; $index: number }) => {
      if (item.render) {
        return item.render({
          row: scope.row,
          curRowIndex: scope.$index,
          data: props.data ?? []
        })
      }

      if (item.children) {
        return item.children.map((cItem: TableColumnCtx) => (
          <ElTableColumn key={cItem.prop} {...cItem} />
        ))
      }

      return <span>{scope.row[item.prop]}</span>
    }

    return () => (
      <>
        {props.columns?.map((item) => (
          <ElTableColumn key={item.prop as string} {...item}>
            {{
              default: (scope: { row: Record<string, any>; $index: number }) => renderColumnContent(item, scope)
            }}
          </ElTableColumn>
        ))}
      </>
    )
  }
})

export default RecursiveTableColumn
