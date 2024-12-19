import config from '@/config'
import { defineAsyncComponent, Suspense, onMounted } from 'vue'
import homeStyle from './home.module.scss'
import type { TableProps, TableColumnCtx, Render } from '@yaoxfly-ui-plus/component-pc'
export default defineComponent({
  name: 'Home',
  components: {
    // YxButton,
    // YxTest
    AsyncComponent: defineAsyncComponent(() => import('../test/child'))
  },
  setup() {
    // 主题切换
    const setTheme = () => {
      document.documentElement.style.setProperty('--color-primary-base', '16,185,129')
    }

    setTheme()
    const input = useStorage('input-value', '可同步数据到localstorage的输入框') // vueuse的api，自动将ref同步到localstorage,实现双向绑定

    const tableRef = ref<Record<string, any>>()

    onMounted(() => {
      console.log(tableRef.value && tableRef.value, 'elTableRef')
    })

    interface RowData {
      id: string | number;
      name: string;
      age: number | string;
      job: string;
    }

    return () => {
      const route = useRoute()
      console.log(route.query, '传递给home页面的参数')
      const table = ref<{ data: RowData[], columns: Partial<TableColumnCtx>[] }>({
        data: [
          { id: 1, name: '张三', age: 28, job: '工ba程师' },
          { id: 2, name: '李四', age: 34, job: '设计师' },
          { id: 3, name: '王五', age: 25, job: '产品经理' }
        ],
        columns: [
          {
            prop: 'name',
            label: '姓名',
            render: (data: Render<RowData>) => {
              console.log(data.data, 'data')
              return <span>{data.row.name}</span>
            }

          },
          { prop: 'age', label: '年龄' },
          { prop: 'job', label: '职业' }
        ]
        // config: {
        //   border: true,
        //   stripe: true,
        //   showIndex: true,
        //   showSelection: true,
        //   showExpand: true,
        //   showPagination: true,
        //   pagination: {
        //     page: 1,
        //     pageSize: 10,
        //     total: 0
        //   }
        // }
      })

      return (
        <>
          <yx-button></yx-button>
          <yx-test ></yx-test>
          <yx-table {...table.value} ref={tableRef} ></yx-table>
          <div>{table.value}</div>
          <div class='tw-flex tw-justify-center  tw-items-center  tw-bg-gray-50  tw-text-black'>
            <span >我是首页{config.server}</span>
          </div>

          <div class={['tw-container', 'tw-m-16', 'tw-text-large', 'tw-bg-primary', 'tw-rounded', homeStyle.container]} >
            容器1
          </div>

          <div class='tw-container  tw-m-16  tw-text-base  tw-bg-primary-10  tw-text-regular tw-border-base  tw-border tw-leading-32 ' >
            容器2
          </div>

          <input v-model={input.value} class='tw-w-500 tw-border tw-border-solid tw-border-black' ></input>
          <Suspense>
            {{
              default: <async-component />,
              fallback: <div>Loading...</div>
            }}
          </Suspense>

        </>
      )
    }
  }
})
