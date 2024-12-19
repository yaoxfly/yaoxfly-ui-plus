import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    render: {
      type: Function,
      default: () => { }
    },
    curRowIndex: { // 行下标
      type: [Number, String],
      default: ''
    },
    row: {
      type: Object,
      default: () => { }
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const params = {
      row: props.row,
      data: props.data,
      curRowIndex: props.curRowIndex
    }
    return (params: any) => props.render(params)
  }
})
