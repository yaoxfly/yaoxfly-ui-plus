import { defineComponent, useAttrs, PropType } from 'vue'
import { FormProps, FormItemPropsEl } from './props'
import { useExpose } from '../../../hook'
const COMPONENT_NAME = 'YxForm'
export default defineComponent({
  name: COMPONENT_NAME,
  props: {
    formItems: {
      type: Array as PropType<FormProps['formItems']>,
      required: true
    }
  },
  setup(props) {
    const $attrs = useAttrs() as unknown as FormProps
    const refs = ref<{ [key: string]: any }>({})
    console.log($attrs, 'ddd')
    const getFormItem = ref<{ [key: string]: (item: FormItemPropsEl) => any }>({
      input: (cItem) => <el-input v-model={[$attrs.model[cItem.input?.vModel ?? ''], ['trim']]} {...cItem.input} ref={(el: any) => setRef(el, cItem)} />,
      select: (cItem) => <el-select v-model={$attrs.model[cItem.select?.vModel ?? '']} {...cItem.select} ref={(el: any) => setRef(el, cItem)} >
        {cItem.select?.options && cItem.select?.options.map((item) => <el-option key={item.value} {...item} />)}
      </el-select>,
      inputNumber: (cItem) => <el-input-number v-model={$attrs.model[cItem.inputNumber?.vModel ?? '']} {...cItem.inputNumber} ref={(el: any) => setRef(el, cItem)} />,
      radio: (cItem) => {
        const { radioGroup, vModel, ...other } = cItem.radio ?? {}
        const { radio, radioButton, ...restRadioGroupProps } = radioGroup ?? {}
        return (
          <el-radio-group v-model={$attrs.model[cItem.radio?.vModel ?? '']} {...restRadioGroupProps} {...other} ref={(el: any) => setRef(el, cItem)}>
            {radio && radio.map((item) => (
              <el-radio key={item.value} {...item}>{item.label}</el-radio>
            ))}

            {radioButton && radioButton.map((item) => (
              <el-radio-button key={item.value} {...item}>{item.label}</el-radio-button>
            ))}
          </el-radio-group>
        )
      }
    })

    const setRef = (el: any, cItem: FormItemPropsEl) => {
      refs.value[cItem.ref] = el
    }

    useExpose({ refs })
    return () => (
      <div>
        <el-form {...$attrs} >
          {
            props.formItems.map((item) => <el-form-item >
              {item.map((cItem) => <el-col {...cItem} >
                <el-form-item {...cItem} key={cItem.label} >
                  {cItem.type && getFormItem.value[cItem.type] ? getFormItem.value[cItem.type](cItem) : null}
                </el-form-item>
              </el-col>)
              }
            </el-form-item>)
          }
        </el-form>
      </div >
    )
  }
})
