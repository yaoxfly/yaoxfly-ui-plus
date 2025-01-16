import { defineComponent, PropType, ref } from 'vue'
import type {
  FormProps, FormItemPropsEl, ElFormInstance, InputInstance,
  InputNumberInstance, RadioGroupInstance, CheckboxGroupInstance,
  DatePickerInstance, TimeSelectInstance, CascaderInstance,
  AutocompleteInstance, TreeInstance

} from './types'
import { useExpose, useBem } from '../../../hook'
import { namespace } from '../../../utils'
const COMPONENT_NAME = `${namespace}Form`
export default defineComponent({
  name: COMPONENT_NAME,
  inheritAttrs: false,
  props: {
    formItems: {
      type: Array as PropType<FormProps['formItems']>,
      required: true
    },
    clearable: {
      type: Boolean,
      required: false
    },
    disableAfterToday: {
      type: Boolean,
      required: false
    }
  },
  setup(props, { attrs, slots }) {
    const { componentName, createBEM } = useBem({ name: COMPONENT_NAME })
    // const bem = createBEM(COMPONENT_NAME)
    const $attrs = attrs as unknown as FormProps
    const refs = ref<{ [key: string]: any }>({})
    const disableAfterToday = (date: Date) => date.getTime() > new Date().setHours(23, 59, 59, 999)
    const unDisableAfterToday = () => false
    const getFormItem = ref<{ [key: string]: (item: FormItemPropsEl) => any }>({
      input: (cItem) => <el-input v-model={[$attrs.model[cItem.input?.vModel ?? ''], ['trim']]} {...cItem.input} ref={(el: any) => setRef(el, cItem)} clearable={cItem.input?.clearable ?? props.clearable} />,
      select: (cItem) => <el-select v-model={$attrs.model[cItem.select?.vModel ?? '']} {...cItem.select} ref={(el: any) => setRef(el, cItem)} clearable={cItem.select?.clearable ?? props.clearable} >
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
      datePicker: (cItem) => <el-date-picker
        v-model={$attrs.model[cItem.datePicker?.vModel ?? '']} {...cItem.datePicker}
        value-format={(cItem.datePicker && cItem.datePicker.valueFormat) ?? 'YYYY-MM-DD'}
        ref={(el: any) => setRef(el, cItem)}
        clearable={cItem.datePicker?.clearable ?? props.clearable}
        disabled-date={cItem?.datePicker?.disabledDate ?? (props.disableAfterToday ? disableAfterToday : unDisableAfterToday)}

      />,
      timePicker: (cItem) => <el-time-picker v-model={$attrs.model[cItem.timePicker?.vModel ?? '']} {...cItem.timePicker} value-format={(cItem.timePicker && cItem.timePicker.valueFormat) ?? 'HH:mm:ss'} ref={(el: any) => setRef(el, cItem)} clearable={cItem.timePicker?.clearable ?? props.clearable} />,
      timeSelect: (cItem) => <el-time-select v-model={$attrs.model[cItem.timeSelect?.vModel ?? '']} {...cItem.timeSelect} ref={(el: any) => setRef(el, cItem)} clearable={cItem.timeSelect?.clearable ?? props.clearable} />,
      cascader: (cItem) => <el-cascader v-model={$attrs.model[cItem.cascader?.vModel ?? '']} {...cItem.cascader} ref={(el: any) => setRef(el, cItem)} clearable={cItem.cascader?.clearable ?? props.clearable} />,
      autocomplete: (cItem) => <el-autocomplete v-model={$attrs.model[cItem.autocomplete?.vModel ?? '']} {...cItem.autocomplete} ref={(el: any) => setRef(el, cItem)} clearable={cItem.autocomplete?.clearable ?? props.clearable} />,
      treeSelect: (cItem) => <el-tree-select v-model={$attrs.model[cItem.treeSelect?.vModel ?? '']} {...cItem.treeSelect} ref={(el: any) => setRef(el, cItem)} clearable={cItem.treeSelect?.clearable ?? props.clearable} />
    })
    const setRef = (el: unknown, cItem: FormItemPropsEl) => {
      let newEL
      if (cItem.ref) {
        switch (cItem.type) {
          case 'input':
            newEL = el as InputInstance
            break
          case 'inputNumber':
            newEL = el as InputNumberInstance
            break
          case 'radio':
            newEL = el as RadioGroupInstance
            break
          case 'checkbox':
            newEL = el as CheckboxGroupInstance
            break
          case 'datePicker':
            newEL = el as DatePickerInstance
            break
          case 'timeSelect':
            newEL = el as TimeSelectInstance
            break
          case 'Cascader':
            newEL = el as CascaderInstance
            break
          case 'autocomplete':
            newEL = el as AutocompleteInstance
            break
          case 'treeSelect':
            newEL = el as TreeInstance
            break
          case 'form':
            newEL = el as ElFormInstance
            break
          default:
            newEL = el as any
            break
        }
        refs.value[cItem.ref] = newEL
      }
    }

    const renderFormItemContent = (cItem: FormItemPropsEl, index: number) => {
      let renderContent = null
      if (cItem.render) {
        // 如果有 render，直接使用 render 函数
        renderContent = cItem.render({ data: cItem, index })
      } else if (typeof cItem.prop === 'string' && slots[cItem.prop]) {
        // 如果有 slot，使用 slot
        renderContent = slots[cItem.prop]?.(cItem, index)
      } else if (cItem.type && getFormItem.value[cItem.type]) {
        // 如果有 type，使用 getFormItem
        renderContent = getFormItem.value[cItem.type](cItem)
      }

      return (
        <el-form-item {...cItem} key={cItem.label}>
          {renderContent}
        </el-form-item>
      )
    }
    useExpose({ refs: refs.value })
    return () => (
      <div class={componentName.value}>
        <el-form {...$attrs} ref={(el: unknown) => setRef(el, { ref: 'elForm', type: 'form' })}>
          {
            props.formItems.map((item, index) => <el-form-item >
              {item.map((cItem) => <el-col {...cItem} >
                {renderFormItemContent(cItem, index)}
              </el-col>)
              }
            </el-form-item>)
          }
        </el-form>
      </div >
    )
  }
})
