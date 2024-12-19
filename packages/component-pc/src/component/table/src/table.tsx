import { defineComponent, onMounted, ref, useAttrs, PropType } from 'vue'
import { ElTable } from 'element-plus'
import RecursiveTableColumn from './recursive-table-column'
import { useExpose } from '../../../hook'
import { type TableProps, shareProp } from './props'
const COMPONENT_NAME = 'YxTable'
const props = Object.assign({
  stripe: {
    type: Boolean as PropType<TableProps['stripe']>,
    default: true
  },
  showIndex: {
    type: Boolean as PropType<TableProps['showIndex']>,
    default: true
  },
  showSelection: {
    type: Boolean as PropType<TableProps['showSelection']>,
    default: false
  }
}, shareProp)


export default defineComponent({
  name: COMPONENT_NAME,
  props,
  setup(props) {
    const elTableRef = ref<InstanceType<typeof ElTable>>()
    const $attrs = useAttrs()
    useExpose({
      elTableRef
    })
    return () => (
      <div class="yx-table">
        <el-table ref={elTableRef} data={props.data} {...$attrs} stripe={props.stripe}>
          {{
            default: () => (
              <>
                {props.showSelection && <el-table-column type="selection" width="55" />}
                {props.showIndex && <el-table-column type="index" width="100" label="序号" align="center" />}
                <RecursiveTableColumn data={props.data} columns={props.columns} />
              </>
            ),
            empty: () => '暂无数据'
          }}
        </el-table>
      </div>
    )
  }
})
