import config from '@/config'
import { defineAsyncComponent, Suspense, onMounted } from 'vue'
import homeStyle from './home.module.scss'
import type { TableColumnCtx, TableColumnRender, FormItemsProps, FormRules, FormInstance, InputInstance, AutocompleteInstance, FormProps, TableInstance } from '@yaoxfly-ui-plus/component-pc'
import { datePickerProps, datePickTypes } from 'element-plus'
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
    const tableRef = ref<TableInstance | null>(null)
    interface RowData {
      id: string | number;
      name: string;
      age: number | string;
      job: string;
    }

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
          render: (params: TableColumnRender<RowData>) => {
            console.log(params, 'data')
            return <span>{params.row.name}1</span>
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
      checkbox: string[] | number[]
      datePicker: string
      timePicker: string
      timeSelect: string,
      cascader: string
      autocomplete: string,
      treeSelect: string
    }
    interface RestaurantItem {
      value: string
      link: string
    }
    const restaurants = ref<RestaurantItem[]>([])
    const loadAll = () => {
      return [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' }
      ]
    }
    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value
      // call callback function to return suggestions
      cb(results)
    }
    const createFilter = (queryString: string) => {
      return (restaurant: RestaurantItem) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    }



    type CombinedProps = Omit<FormProps, 'rules' | 'formItems' | 'model'> & {
      rules: FormRules<Model>;
      formItems: FormItemsProps;
      model: Model;
    };

    const form = ref<CombinedProps>({
      model: {
        activity1: '111',
        activity2: 0,
        activity3: '',
        activity4: '',
        checkbox: [],
        datePicker: '',
        timePicker: '',
        timeSelect: '',
        cascader: '',
        autocomplete: '',
        treeSelect: ''

      },
      rules: {
        activity1: { required: true, message: '请输入活动名称', trigger: 'blur' }


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
              clearable: false,
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
            rules: [{ required: true, message: '请输入活动2名称', trigger: 'blur' }],
            type: 'inputNumber',
            render: (params) => {
              return <el-input-Number v-model={form.value.model.activity2} onInput={(value: any) => {
                console.log(value, 'activity2')
                console.log(params)
              }}></el-input-Number>
            }
            // inputNumber: {
            //   vModel: 'activity2',
            //   onInput: (value) => {
            //     console.log(value, 'activity2')
            //   }
            // }
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
              // clearable: true,
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
        ],
        [
          {
            label: 'checkbox',
            span: 8,
            prop: 'checkbox',
            // rules: [{ required: true, message: '请输入活动2名称', trigger: 'blur' }],
            type: 'checkbox',
            checkbox: {
              vModel: 'checkbox',
              checkboxGroup: {
                // checkbox: [{ label: '活动2', value: 2 }, { label: '活动3', value: 3 }],
                checkboxButton: [{ label: '活动2', value: 2 }, { label: '活动3', value: 3 }]
              },
              onChange: (value) => {
                console.log(value, 'checkbox')
              }
            }
          },
          {
            label: 'datePicker',
            span: 8,
            prop: 'datePicker',
            type: 'datePicker',
            datePicker:
            {
              placeholder: '请输入活动名称',
              vModel: 'datePicker',
              // disabledDate: () => false,
              // clearable: true,
              onChange: (value) => {
                console.log(value)
              }

            }
          },
          {
            label: 'timePicker',
            span: 8,
            prop: 'timePicker',
            type: 'timePicker',
            timePicker:
            {
              vModel: 'timePicker',
              onChange: (value) => {
                console.log(value)
              }

            }
          }

        ],
        [
          {
            label: 'timeSelect',
            span: 8,
            prop: 'timeSelect',
            // rules: [{ required: true, message: '请输入活动2名称', trigger: 'blur' }],
            type: 'timeSelect',
            timeSelect: {
              vModel: 'timeSelect',
              onChange: (value) => {
                console.log(value)
              }
            }
          },
          {
            label: 'cascader',
            span: 8,
            prop: 'cascader',
            type: 'cascader',
            cascader:
            {
              vModel: 'cascader',
              // clearable: true,
              showAllLevels: false,
              props: { multiple: true },
              filterable: true,
              options: [
                {
                  value: 'guide',
                  label: 'Guide',
                  children: [
                    {
                      value: 'disciplines',
                      label: 'Disciplines',
                      children: [
                        {
                          value: 'consistency',
                          label: 'Consistency'
                        },
                        {
                          value: 'feedback',
                          label: 'Feedback'
                        },
                        {
                          value: 'efficiency',
                          label: 'Efficiency'
                        },
                        {
                          value: 'controllability',
                          label: 'Controllability'
                        }
                      ]
                    }

                  ]
                },
                {
                  value: 'component',
                  label: 'Component',
                  children: [
                    {
                      value: 'basic',
                      label: 'Basic',
                      children: [
                        {
                          value: 'layout',
                          label: 'Layout'
                        },
                        {
                          value: 'color',
                          label: 'Color'
                        },
                        {
                          value: 'typography',
                          label: 'Typography'
                        },
                        {
                          value: 'icon',
                          label: 'Icon'
                        },
                        {
                          value: 'button',
                          label: 'Button'
                        }
                      ]
                    }
                  ]
                }

              ],
              onChange: (value) => {
                console.log(value)
              }
            }
          },
          {
            label: 'autocomplete',
            span: 8,
            prop: 'autocomplete',
            type: 'autocomplete',
            ref: 'autocomplete',
            autocomplete:

            {
              vModel: 'autocomplete',
              fetchSuggestions: querySearch,
              onChange: (value) => {
                console.log(value)
              },
              onSelect: (value) => {
                console.log(value)
              }
            }
          }
        ],
        [
          {
            label: 'treeSelect',
            span: 24,
            type: 'treeSelect',
            prop: 'treeSelect',
            ref: 'treeSelect',
            treeSelect: {
              placeholder: '请输入活动名称',
              vModel: 'treeSelect',
              // clearable: true,
              showCheckbox: true,
              checkStrictly: true,
              renderAfterExpand: false,
              multiple: true,
              data: [
                {
                  value: '1',
                  label: 'Level one 1',
                  children: [
                    {
                      value: '1-1',
                      label: 'Level two 1-1',
                      children: [
                        {
                          value: '1-1-1',
                          label: 'Level three 1-1-1'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: '2',
                  label: 'Level one 2',
                  children: [
                    {
                      value: '2-1',
                      label: 'Level two 2-1',
                      children: [
                        {
                          value: '2-1-1',
                          label: 'Level three 2-1-1'
                        }
                      ]
                    },
                    {
                      value: '2-2',
                      label: 'Level two 2-2',
                      children: [
                        {
                          value: '2-2-1',
                          label: 'Level three 2-2-1'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: '3',
                  label: 'Level one 3',
                  children: [
                    {
                      value: '3-1',
                      label: 'Level two 3-1',
                      children: [
                        {
                          value: '3-1-1',
                          label: 'Level three 3-1-1'
                        }
                      ]
                    },
                    {
                      value: '3-2',
                      label: 'Level two 3-2',
                      children: [
                        {
                          value: '3-2-1',
                          label: 'Level three 3-2-1'
                        }
                      ]
                    }
                  ]
                }
              ],
              onNodeClick: (value) => {
                console.log(value, 'onNodeClick')
              },
              onChange: (value) => {
                console.log(form.value.model.treeSelect, 'onChange')
              },
              onCheckChange: (nodeObject, node, checkNode) => {
                console.log(nodeObject, node, checkNode, 'onCheckChange')
              }
            }
          }
        ]
      ],
      labelWidth: '150'
    })

    const formRef = ref<FormInstance<'activity1Ref' | 'autocomplete', {
      activity1Ref: InputInstance;
      autocomplete: AutocompleteInstance
    }> | null>(null)
    nextTick(() => {
      console.log(formRef.value && formRef.value.refs.activity1Ref, 'formRef')
      setTimeout(() => {
        formRef.value && formRef.value.refs.activity1Ref.clear()
      }, 2000)
    })

    onMounted(() => {
      restaurants.value = loadAll()
      console.log(tableRef.value?.elTableRef)
    })


    return () => <>
      {/* <yx-button></yx-button>
        <yx-test ></yx-test> */}
      <yx-table {...table.value} ref={tableRef} ></yx-table>
      <yx-form {...form.value} ref={formRef} clearable disable-after-today >

        {{
          datePicker: (item: any) => item.type
        }}

      </yx-form>
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
  }
})
