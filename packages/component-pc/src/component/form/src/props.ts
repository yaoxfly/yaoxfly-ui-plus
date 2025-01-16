import type {
  FormItemProps as ElFormItemProps,
  FormProps as ElFormProps,
  FormItemRule as ElFormItemRule,
  FormRules as ElFormRules,
  FormInstance as ElFormInstances,
  // input
  InputProps as ElInputProps,
  InputInstance as ElInputInstance,
  InputNumberInstance as ElInputNumberInstance,
  InputEmits,
  InputNumberEmits,
  // select
  ISelectProps,
  // radio
  RadioProps as ElRadioProps,
  RadioGroupProps as ElRadioGroupProps,
  RadioEmits,
  RadioGroupInstance as ElRadioGroupInstance,
  RadioInstance as ElRadioInstance,
  RadioButtonProps,
  RadioButtonInstance as ElRadioButtonInstance,
  // checkbox
  CheckboxProps as ElCheckboxProps,
  CheckboxGroupProps as ElCheckboxGroupProps,
  CheckboxEmits,
  CheckboxGroupInstance as ElCheckboxGroupInstance,
  CheckboxInstance as ElCheckboxInstance,
  // DatePicker
  DatePickerProps as ElDatePickerProps,
  DatePickerInstance as ElDatePickerInstance,
  // TimePicker
  TimePickerDefaultProps,
  // TimeSelect
  TimeSelectProps as ElTimeSelectProps,
  TimeSelectInstance as ElTimeSelectInstance,
  // Cascader
  CascaderEmits as ElCascaderEmits,
  CascaderInstance as ElCascaderInstance,
  // Autocomplete
  AutocompleteInstance as ElAutocompleteInstance,
  AutocompleteEmits,
  // Tree
  TreeInstance as ElTreeInstance
} from 'element-plus'
import { JSX } from 'vue/jsx-runtime'
import type Form from './form'
export type CamelCase<S extends string> =
  S extends `${infer T}-${infer U}${infer Rest}`
  ? `${Capitalize<T>}${CamelCase<`${Capitalize<U>}${Rest}`>}`
  : Capitalize<S>;

export type InputProps = Partial<ElInputProps> & {
  vModel: string;
  modifier: string[]
} & {
  [key in keyof InputEmits as `on${CamelCase<string & key>}`]: (...args: Parameters<InputEmits[key]>) => void;
};

export type SelectEmit = {
  change: (value: any) => void;
  'visible-change': (visible: boolean) => void;
  'remove-tag': (tag: any) => void;
  'clear': () => void;
  'blur': (event: FocusEvent) => void;
  'focus': (event: FocusEvent) => void;
};

export type SelectProps = Partial<ISelectProps> & {
  vModel: string;
  options: {
    label?: string;
    value?: string;
    disabled?: boolean;
  }[];
} & {
  [key in keyof SelectEmit as `on${CamelCase<string & key>}`]: (...args: Parameters<SelectEmit[key]>) => void;
};

export type InputNumberProps = Partial<ElInputNumberInstance['$props']> & {
  vModel: string;
} & {
  [key in keyof InputNumberEmits as `on${CamelCase<string & key>}`]: (...args: Parameters<InputEmits[key]>) => void;
};

export type radioProps = {
  vModel: string;
  radioGroup: Partial<ElRadioGroupProps> & {
    radio?: Partial<ElRadioProps>[];
    radioButton?: Partial<RadioButtonProps>[];
  };
} & {
  [key in keyof RadioEmits as `on${CamelCase<string & key>}`]: (...args: Parameters<RadioEmits[key]>) => void;
};


export type CheckboxProps = {
  vModel: string;
  checkboxGroup: Partial<ElCheckboxGroupProps> & {
    checkbox?: Partial<ElCheckboxProps>[];
    checkboxButton?: Partial<ElCheckboxProps>[];
  };
} & {
  [key in keyof CheckboxEmits as `on${CamelCase<string & key>}`]: (...args: Parameters<CheckboxEmits[key]>) => void;
};

export type DatePickerEmit = {
  change: (value: any) => void;
  'blur': (e: FocusEvent) => void
  'focus': (e: FocusEvent) => void;
  'clear': () => void;
  'calendar-change': (val: [Date, null | Date]) => void
  'panel-change': (date: Date | [Date, Date], mode: 'month' | 'year', view?: string) => void;
  'visible-change': (visibility: boolean) => void;
}


export type DatePickerProps = Partial<ElDatePickerProps> & {
  vModel: string;
} & {
  [key in keyof DatePickerEmit as `on${CamelCase<string & key>}`]: (...args: Parameters<DatePickerEmit[key]>) => void;
};


export type TimePickerEmit = {
  change: (val: number | string | Date | [number, number] | [string, string] | [Date, Date]) => void;
  'blur': (e: FocusEvent) => void
  'focus': (e: FocusEvent) => void;
  'clear': () => void;
  'visible-change': (visibility: boolean) => void;
}

export type TimePickerProps = Partial<TimePickerDefaultProps> & {
  vModel: string;
} & {
  [key in keyof TimePickerEmit as `on${CamelCase<string & key>}`]: (...args: Parameters<TimePickerEmit[key]>) => void;
};


export type TimeSelectEmit = {
  change: (val: number | string | Date | [number, number] | [string, string] | [Date, Date]) => void;
  'blur': (e: FocusEvent) => void
  'focus': (e: FocusEvent) => void;
  'clear': () => void;
  // 'visible-change': (visibility: boolean) => void;
}

export type TimeSelectProps = Partial<ElTimeSelectProps> & {
  vModel: string;
} & {
  [key in keyof TimeSelectEmit as `on${CamelCase<string & key>}`]: (...args: Parameters<TimeSelectEmit[key]>) => void;
};

export type CascaderProps = Partial<ElCascaderInstance['$props']> & {
  vModel: string;
} & {
  [key in keyof ElCascaderEmits as `on${CamelCase<string & key>}`]: (...args: Parameters<ElCascaderEmits[key]>) => void;
};


export type AutocompleteProps = Partial<ElAutocompleteInstance['$props']> & {
  vModel: string;
  placeholder: string
} & {
  [key in keyof AutocompleteEmits as `on${CamelCase<string & key>}`]: (...args: Parameters<AutocompleteEmits[key]>) => void;
};


type TreeEmitType = ElTreeInstance['$emit'];
export type TreeEmit = {
  [K in Parameters<TreeEmitType>[0]]: (...args: Extract<Parameters<TreeEmitType>, [K, ...any]>[1]) => void;
};

export type TreeSelectEmit = SelectEmit & TreeEmit
export type TreeSelectProps = Partial<ElTreeInstance['$props'] & ISelectProps> & {
  vModel: string;
} & {
  [key in keyof TreeSelectEmit as `on${CamelCase<string & key>}`]: (...args: Parameters<TreeSelectEmit[key]>) => void;
};

export interface FormItemPropsEl extends Partial<ElFormItemProps> {
  ref?: any;
  span?: number;
  type?: string;
  input?: Partial<InputProps>,
  select?: Partial<SelectProps>,
  inputNumber?: Partial<InputNumberProps>
  render?:(params: { data: FormItemPropsEl, index: number }) => JSX.Element
  radio?: Partial<radioProps>
  checkbox?: Partial<CheckboxProps>
  datePicker?: Partial<DatePickerProps>
  timePicker?: Partial<TimePickerProps>
  timeSelect?: Partial<TimeSelectProps>
  cascader?: Partial<CascaderProps>
  autocomplete?: Partial<AutocompleteProps>
  treeSelect?: Partial<TreeSelectProps>
}

export type FormItemsProps = FormItemPropsEl[][];
export type FormItemRule = ElFormItemRule;
export type FormRules<T> = {
  [K in keyof T]?: ElFormRules[number];
};

export interface FormProps extends Partial<ElFormProps> {
  formItems: FormItemsProps;
  model: Record<string, any>;
}

export type InputInstance = ElInputInstance
export type InputNumberInstance = ElInputNumberInstance
export type RadioGroupInstance = ElRadioGroupInstance
export type RadioInstance = ElRadioInstance
export type RadioButtonInstance = ElRadioButtonInstance
export type CheckboxGroupInstance = ElCheckboxGroupInstance
export type CheckboxInstance = ElCheckboxInstance
export type DatePickerInstance = ElDatePickerInstance
export type TimeSelectInstance = ElTimeSelectInstance
export type CascaderInstance = ElCascaderInstance
export type AutocompleteInstance = ElAutocompleteInstance
export type TreeInstance = ElTreeInstance
export type ElFormInstance = ElFormInstances
export type FormInstance<
  K extends string = string,
  T extends Record<K, any> = Record<string, any>
> = InstanceType<typeof Form> & {
  refs: T;
};
