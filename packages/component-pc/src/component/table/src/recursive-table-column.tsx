import { defineComponent } from 'vue'
import { ElTableColumn } from 'element-plus'
import Render from './table-column-render'
import { shareProp, TableColumnCtx } from './props'
const RecursiveTableColumn = defineComponent({
  name: 'RecursiveTableColumn',
  props: shareProp,
  setup(props) {
    return () => (
      <>
        {props.columns?.map((item) => (
          <ElTableColumn key={item.prop as string} {...item}>
            {{
              default: (scope: { row: Record<string, any>; $index: number }) => (
                <>
                  {item.render
                    ? (
                      <Render
                        render={item.render}
                        row={scope.row}
                        curRowIndex={scope.$index}
                        data={props.data}
                      />
                    )
                    : item.children
                      ? (
                        item.children.map((cItem: TableColumnCtx) => (
                          <ElTableColumn key={cItem.prop} {...cItem} />
                        ))
                      )
                      : (
                        <span>{scope.row[item.prop]}</span>
                      )}
                </>
              )
            }}
          </ElTableColumn>
        ))}
      </>
    )
  }
})

export default RecursiveTableColumn
