import config from '@/config'
import { defineAsyncComponent, Suspense, onMounted } from 'vue'
import homeStyle from './home.module.scss'
import type { TableColumnCtx, Render, FormItemsProps, FormRules } from '@yaoxfly-ui-plus/component-pc'
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

      interface Model {
        activity1: string
        activity2: number
        activity3: string
        activity4: string
      }

      const form = ref<{ formItems: FormItemsProps, model: Model, rules: FormRules<Model> }>({
        model: {
          activity1: '111',
          activity2: 0,
          activity3: '',
          activity4: ''
        },
        rules: {
          activity1:
            { required: true, message: '请输入活动名称', trigger: 'blur' }
        },
        formItems: [
          [
            {
              label: 'Activity name1',
              span: 24,
              type: 'input',
              prop: 'activity1',
              ref: 'activity1Ref',
              input: {
                placeholder: '请输入活动名称',
                vModel: 'activity1',
                clearable: true,
                modifier: ['trim'],
                onBlur: (event) => {
                  console.log((event.target as HTMLInputElement).value, 'activity1')
                }
              }
            }
          ],
          [
            {
              label: 'Activity name2',
              span: 8,
              prop: 'activity2',
              // rules: [{ required: true, message: '请输入活动2名称', trigger: 'blur' }],
              type: 'inputNumber',
              inputNumber: {
                vModel: 'activity2',
                onInput: (value) => {
                  console.log(value, 'activity2')
                }
              }
            },
            {
              label: 'Activity name3',
              span: 8,
              prop: 'activity3',
              type: 'select',
              select:
              {
                placeholder: '请输入活动名称',
                vModel: 'activity3',
                clearable: true,
                options: [{ label: '活动2', value: '2', disabled: true }, { label: '活动3', value: '3' }]
              }
            },
            {
              label: 'Activity name4',
              span: 8,
              prop: 'activity4',
              type: 'radio',
              radio:
              {
                vModel: 'activity4',
                onChange: (value) => {
                  console.log(value)
                },
                radioGroup: {
                  // radio: [{ label: '活动2', value: '2' }, { label: '活动3', value: '3' }],
                  radioButton: [{ label: '活动2', value: '2' }, { label: '活动3', value: '3' }]
                }
              }
            }
          ]
        ]
      })

      const formRef = ref<{ refs: any } | null>(null)
      nextTick(() => {
        console.log(formRef.value && formRef.value, 'formRef')
        setTimeout(() => {
          formRef.value && formRef.value.refs.value.activity1Ref.clear()
        }, 2000)
      })

      return (
        <>
          {/* <yx-button></yx-button>
          <yx-test ></yx-test> */}
          {/* <yx-table {...table.value} ref={tableRef} ></yx-table> */}
          <yx-form {...form.value} ref={formRef}></yx-form>
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
