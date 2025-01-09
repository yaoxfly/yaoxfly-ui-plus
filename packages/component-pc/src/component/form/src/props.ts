import type {
  FormItemProps as ElFormItemProps,
  InputProps as ElInputProps,
  FormProps as ElFormProps,
  ISelectProps,
  FormItemRule as ElFormItemRule,
  FormRules as ElFormRules,
  InputNumberInstance as ElInputNumberInstance,
  InputEmits,
  InputNumberEmits,
  RadioProps as ElRadioProps,
  RadioGroupProps as ElRadioGroupProps,
  RadioEmits,
  RadioButtonProps
} from 'element-plus'


export type InputProps = Partial<ElInputProps> & {
  vModel: string;
  modifier:string[]

} & {
  [key in keyof InputEmits as `on${Capitalize<string & key>}`]: (...args: Parameters<InputEmits[key]>) => void;
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
  options:{
    label?: string;
    value?: string;
    disabled?: boolean;
  }[];
} & SelectEmit;


export type InputNumberInstance = Partial<ElInputNumberInstance> & {
  vModel: string;
} & {
  [key in keyof InputNumberEmits as `on${Capitalize<string & key>}`]: (...args: Parameters<InputEmits[key]>) => void;
};



export type radioProps = {
  vModel: string;
  radioGroup:Partial<ElRadioGroupProps> & {
    radio?: Partial<ElRadioProps>[];
    radioButton?: Partial<RadioButtonProps>[];
  } ;
}& {
  [key in keyof RadioEmits as `on${Capitalize<string & key>}`]: (...args: Parameters<RadioEmits[key]>) => void;
};




export interface FormItemPropsEl extends Partial<ElFormItemProps> {
  ref?:any;
  span?: number;
  type?: string;
  input?: Partial<InputProps>,
  select?: Partial<SelectProps>,
  inputNumber?: Partial<InputNumberInstance>
  radio?:Partial<radioProps>
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
