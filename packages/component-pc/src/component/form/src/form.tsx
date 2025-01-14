import { defineComponent, PropType } from 'vue'
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
  setup(props, { attrs }) {
    const $attrs = attrs as unknown as FormProps
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
      },
      checkbox: (cItem) => {
        const { checkboxGroup, vModel, ...other } = cItem.checkbox ?? {}
        const { checkbox, checkboxButton, ...restCheckboxGroupProps } = checkboxGroup ?? {}
        return (
          <el-checkbox-group v-model={$attrs.model[cItem.checkbox?.vModel ?? '']} {...restCheckboxGroupProps} {...other} ref={(el: any) => setRef(el, cItem)}>
            {checkbox && checkbox.map((item) => (
              <el-checkbox key={item.value} {...item}>{item.label}</el-checkbox>
            ))}

            {checkboxButton && checkboxButton.map((item) => (
              <el-checkbox-button key={item.value} {...item}>{item.label}</el-checkbox-button>
            ))}
          </el-checkbox-group>
        )
      },
      datePicker: (cItem) => <el-date-picker v-model={$attrs.model[cItem.datePicker?.vModel ?? '']} {...cItem.datePicker} value-format={(cItem.datePicker && cItem.datePicker.valueFormat) ?? 'YYYY-MM-DD'} ref={(el: any) => setRef(el, cItem)} />,
      timePicker: (cItem) => <el-time-picker v-model={$attrs.model[cItem.timePicker?.vModel ?? '']} {...cItem.timePicker} value-format={(cItem.timePicker && cItem.timePicker.valueFormat) ?? 'HH:mm:ss'} ref={(el: any) => setRef(el, cItem)} />,
      timeSelect: (cItem) => <el-time-select v-model={$attrs.model[cItem.timeSelect?.vModel ?? '']} {...cItem.timeSelect} ref={(el: any) => setRef(el, cItem)} />,
      cascader: (cItem) => <el-cascader v-model={$attrs.model[cItem.cascader?.vModel ?? '']} {...cItem.cascader} ref={(el: any) => setRef(el, cItem)} />,
      autocomplete: (cItem) => <el-autocomplete v-model={$attrs.model[cItem.autocomplete?.vModel ?? '']} {...cItem.autocomplete} ref={(el: any) => setRef(el, cItem)} />,
      treeSelect: (cItem) => <el-tree-select v-model={$attrs.model[cItem.treeSelect?.vModel ?? '']} {...cItem.treeSelect} ref={(el: any) => setRef(el, cItem)} />
    })
    const setRef = (el: any, cItem: FormItemPropsEl) => {
      if (cItem.ref) {
        refs.value[cItem.ref] = el
      }
    }
    useExpose({ refs: refs.value })
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
